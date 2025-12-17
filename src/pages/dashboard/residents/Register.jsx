import { useState } from "react";
import { useNavigate, Link } from "react-router";
import {
    TextField,
    Button,
    MenuItem,
    Select,
    InputLabel,
    FormControl,
    CircularProgress,
    Alert,
    Checkbox,
    FormControlLabel,
    Divider,
    Typography,
} from "@mui/material";
import { Save, ArrowBack } from "@mui/icons-material";
import { ResidenteService } from "../../../services/ResidenteService";
import { FamiliarService } from "../../../services/FamiliarService";

export default function Register() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [erro, setErro] = useState("");
    const [feedback, setFeedback] = useState("");

    // Estado para controlar se vai adicionar familiar
    const [hasFamiliar, setHasFamiliar] = useState(false);

    // Dados do Residente
    const [residentData, setResidentData] = useState({
        nome: "",
        cpf: "",
        rg: "",
        email: "",
        dataNascimento: "",
        genero: "",
        statusPaciente: "ATIVO",
    });

    // Dados do Familiar
    const [familiarData, setFamiliarData] = useState({
        nome: "",
        cpf: "",
        rg: "",
        email: "",
        telefone: "",
        parentesco: "FILHO", // Valor padrão
        // Endereço do familiar
        endereco: {
            cep: "",
            logradouro: "",
            numero: "",
            bairro: "",
            cidade: "",
            unidadeFederativa: "SP",
        },
    });

    const generos = [
        { value: "MASCULINO", label: "Masculino" },
        { value: "FEMININO", label: "Feminino" },
        { value: "OUTRO", label: "Outro" },
    ];

    const parentescos = [
        "FILHO",
        "FILHA",
        "NETO",
        "NETA",
        "ESPOSO",
        "ESPOSA",
        "IRMAO",
        "IRMA",
        "OUTRO",
    ];

    const statusOpcoes = [
        { value: "ATIVO", label: "Ativo" },
        { value: "INATIVO", label: "Inativo" },
        { value: "EM_OBSERVACAO", label: "Em Observação" },
    ];

    // --- Máscaras ---
    const masks = {
        cpf: (v) =>
            v
                .replace(/\D/g, "")
                .replace(/(\d{3})(\d)/, "$1.$2")
                .replace(/(\d{3})(\d)/, "$1.$2")
                .replace(/(\d{3})(\d{1,2})/, "$1-$2")
                .slice(0, 14),
        rg: (v) =>
            v
                .replace(/\D/g, "")
                .replace(/(\d{2})(\d)/, "$1.$2")
                .replace(/(\d{3})(\d)/, "$1.$2")
                .replace(/(\d{3})(\d{1})/, "$1-$2")
                .slice(0, 12),
        telefone: (v) =>
            v
                .replace(/\D/g, "")
                .replace(/^(\d{2})(\d)/, "($1) $2")
                .replace(/(\d)(\d{4})$/, "$1-$2")
                .slice(0, 15),
        cep: (v) =>
            v
                .replace(/\D/g, "")
                .replace(/^(\d{5})(\d)/, "$1-$2")
                .slice(0, 9),
    };

    const handleResidentChange = (e) => {
        const { name, value } = e.target;
        let val = value;
        if (name === "cpf") val = masks.cpf(value);
        if (name === "rg") val = masks.rg(value);
        setResidentData((prev) => ({ ...prev, [name]: val }));
    };

    const handleFamiliarChange = (e) => {
        const { name, value } = e.target;
        let val = value;
        if (name === "cpf") val = masks.cpf(value);
        if (name === "rg") val = masks.rg(value);
        if (name === "telefone") val = masks.telefone(value);

        setFamiliarData((prev) => ({ ...prev, [name]: val }));
    };

    const handleAddressChange = (e) => {
        const { name, value } = e.target;
        let val = value;
        if (name === "cep") val = masks.cep(value);

        setFamiliarData((prev) => ({
            ...prev,
            endereco: { ...prev.endereco, [name]: val },
        }));
    };

    const getClienteId = () => {
        const usuario = JSON.parse(localStorage.getItem("usuario"));
        return usuario?.cliente?.id || usuario?.clienteId || 1;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErro("");

        try {
            const clienteId = getClienteId();

            // 1. Criar Residente
            // Payload simples pois o Java usa @JsonCreator para ValueObjects
            await ResidenteService.criar(clienteId, residentData);
            setFeedback("Residente criado. Processando...");

            // Se tiver familiar, precisamos fazer o fluxo de associação
            if (hasFamiliar) {
                // 2. Buscar ID do Residente recém criado (via CPF)
                const resResidente = await ResidenteService.buscarPorCpf(
                    clienteId,
                    residentData.cpf
                );
                const pacienteId = resResidente.data.id;

                // 3. Criar Familiar
                // O payload do familiar inclui o objeto endereco aninhado
                const familiarPayload = {
                    ...familiarData,
                    clienteId: clienteId,
                };
                await FamiliarService.criar(familiarPayload);
                setFeedback("Familiar criado. Associando...");

                // 4. Buscar ID do Familiar recém criado (via CPF)
                const resFamiliar = await FamiliarService.buscarPorCpf(
                    clienteId,
                    familiarData.cpf
                );
                const familiarId = resFamiliar.data.id;

                // 5. Associar
                await FamiliarService.associarAoPaciente(
                    clienteId,
                    pacienteId,
                    familiarId
                );
            }

            alert("Cadastro realizado com sucesso!");
            navigate("/residentes");
        } catch (error) {
            console.error("Erro no cadastro:", error);
            const msg =
                error.response?.data?.message ||
                "Erro ao processar cadastro. Verifique os CPFs/RGs.";
            setErro(msg);
        } finally {
            setLoading(false);
            setFeedback("");
        }
    };

    return (
        <div className="w-full min-h-screen bg-gray-50 px-4 py-8 flex justify-center">
            <div className="w-full max-w-5xl bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-center mb-6 border-b pb-4">
                    <h1 className="text-2xl font-bold text-gray-800">
                        Novo Cadastro
                    </h1>
                    <Link to="/residentes">
                        <Button variant="outlined" startIcon={<ArrowBack />}>
                            Voltar
                        </Button>
                    </Link>
                </div>

                {erro && (
                    <Alert severity="error" className="mb-6">
                        {erro}
                    </Alert>
                )}
                {feedback && (
                    <Alert severity="info" className="mb-6">
                        {feedback}
                    </Alert>
                )}

                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* --- SEÇÃO RESIDENTE --- */}
                    <div>
                        <Typography
                            variant="h6"
                            className="text-blue-600 mb-4 font-bold"
                        >
                            Dados do Residente
                        </Typography>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <TextField
                                label="Nome Completo"
                                name="nome"
                                fullWidth
                                required
                                value={residentData.nome}
                                onChange={handleResidentChange}
                            />
                            <TextField
                                label="Data de Nascimento"
                                name="dataNascimento"
                                type="date"
                                fullWidth
                                required
                                InputLabelProps={{ shrink: true }}
                                value={residentData.dataNascimento}
                                onChange={handleResidentChange}
                            />
                            <FormControl fullWidth required>
                                <InputLabel>Gênero</InputLabel>
                                <Select
                                    name="genero"
                                    value={residentData.genero}
                                    label="Gênero"
                                    onChange={handleResidentChange}
                                >
                                    {generos.map((op) => (
                                        <MenuItem
                                            key={op.value}
                                            value={op.value}
                                        >
                                            {op.label}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <FormControl fullWidth required>
                                <InputLabel>Status</InputLabel>
                                <Select
                                    name="statusPaciente"
                                    value={residentData.statusPaciente}
                                    label="Status"
                                    onChange={handleResidentChange}
                                >
                                    {statusOpcoes.map((op) => (
                                        <MenuItem
                                            key={op.value}
                                            value={op.value}
                                        >
                                            {op.label}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <TextField
                                label="CPF"
                                name="cpf"
                                fullWidth
                                required
                                value={residentData.cpf}
                                onChange={handleResidentChange}
                                inputProps={{ maxLength: 14 }}
                            />
                            <TextField
                                label="RG"
                                name="rg"
                                fullWidth
                                required
                                value={residentData.rg}
                                onChange={handleResidentChange}
                                inputProps={{ maxLength: 12 }}
                            />
                            <div className="md:col-span-2">
                                <TextField
                                    label="E-mail (Opcional)"
                                    name="email"
                                    type="email"
                                    fullWidth
                                    value={residentData.email}
                                    onChange={handleResidentChange}
                                />
                            </div>
                        </div>
                    </div>

                    <Divider />

                    {/* --- CHECKBOX FAMILIAR --- */}
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={hasFamiliar}
                                onChange={(e) =>
                                    setHasFamiliar(e.target.checked)
                                }
                                color="primary"
                            />
                        }
                        label={
                            <span className="font-semibold text-gray-700">
                                Cadastrar Familiar Responsável agora?
                            </span>
                        }
                    />

                    {/* --- SEÇÃO FAMILIAR --- */}
                    {hasFamiliar && (
                        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                            <Typography
                                variant="h6"
                                className="text-purple-600 mb-4 font-bold"
                            >
                                Dados do Familiar
                            </Typography>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <TextField
                                    label="Nome do Familiar"
                                    name="nome"
                                    fullWidth
                                    required={hasFamiliar}
                                    value={familiarData.nome}
                                    onChange={handleFamiliarChange}
                                />
                                <FormControl fullWidth required={hasFamiliar}>
                                    <InputLabel>Parentesco</InputLabel>
                                    <Select
                                        name="parentesco"
                                        value={familiarData.parentesco}
                                        label="Parentesco"
                                        onChange={handleFamiliarChange}
                                    >
                                        {parentescos.map((p) => (
                                            <MenuItem key={p} value={p}>
                                                {p}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <TextField
                                    label="CPF Familiar"
                                    name="cpf"
                                    fullWidth
                                    required={hasFamiliar}
                                    value={familiarData.cpf}
                                    onChange={handleFamiliarChange}
                                    inputProps={{ maxLength: 14 }}
                                />
                                <TextField
                                    label="RG Familiar"
                                    name="rg"
                                    fullWidth
                                    required={hasFamiliar}
                                    value={familiarData.rg}
                                    onChange={handleFamiliarChange}
                                    inputProps={{ maxLength: 12 }}
                                />
                                <TextField
                                    label="Telefone"
                                    name="telefone"
                                    fullWidth
                                    required={hasFamiliar}
                                    value={familiarData.telefone}
                                    onChange={handleFamiliarChange}
                                    inputProps={{ maxLength: 15 }}
                                />
                                <TextField
                                    label="Email"
                                    name="email"
                                    fullWidth
                                    required={hasFamiliar}
                                    value={familiarData.email}
                                    onChange={handleFamiliarChange}
                                />

                                {/* Endereço Familiar */}
                                <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4 border-t pt-4 mt-2">
                                    <Typography className="md:col-span-3 text-sm font-bold text-gray-500">
                                        Endereço do Familiar
                                    </Typography>
                                    <TextField
                                        label="CEP"
                                        name="cep"
                                        size="small"
                                        required={hasFamiliar}
                                        value={familiarData.endereco.cep}
                                        onChange={handleAddressChange}
                                    />
                                    <TextField
                                        label="Cidade"
                                        name="cidade"
                                        size="small"
                                        required={hasFamiliar}
                                        value={familiarData.endereco.cidade}
                                        onChange={handleAddressChange}
                                    />
                                    <TextField
                                        label="Logradouro"
                                        name="logradouro"
                                        size="small"
                                        required={hasFamiliar}
                                        value={familiarData.endereco.logradouro}
                                        onChange={handleAddressChange}
                                    />
                                    <TextField
                                        label="Número"
                                        name="numero"
                                        size="small"
                                        required={hasFamiliar}
                                        value={familiarData.endereco.numero}
                                        onChange={handleAddressChange}
                                    />
                                    <TextField
                                        label="Bairro"
                                        name="bairro"
                                        size="small"
                                        required={hasFamiliar}
                                        value={familiarData.endereco.bairro}
                                        onChange={handleAddressChange}
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* --- BOTÃO SALVAR --- */}
                    <div className="flex justify-end pt-4">
                        <Button
                            type="submit"
                            variant="contained"
                            size="large"
                            disabled={loading}
                            startIcon={
                                loading ? (
                                    <CircularProgress
                                        size={20}
                                        color="inherit"
                                    />
                                ) : (
                                    <Save />
                                )
                            }
                            className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-8"
                        >
                            {loading ? "Processando..." : "Salvar Cadastro"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
