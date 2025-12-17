import { useState, useEffect } from "react";
import { ClienteService } from "../../services/ClienteService";
import { CircularProgress, Alert, Snackbar } from "@mui/material";

export default function Settings() {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [feedback, setFeedback] = useState({ open: false, message: "", severity: "success" });
    
    const [formData, setFormData] = useState({
        id: null,
        nome: "",
        email: "",
        telefone: "",
        cnpj: "",
        adminId: null,
        endereco: {
            id: null,
            logradouro: "",
            numero: "",
            bairro: "",
            cidade: "",
            unidadeFederativa: "", 
            cep: "",
            complemento: ""
        }
    });

    const masks = {
        cnpj: (v) => v.replace(/\D/g, '')
            .replace(/^(\d{2})(\d)/, '$1.$2')
            .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
            .replace(/\.(\d{3})(\d)/, '.$1/$2')
            .replace(/(\d{4})(\d)/, '$1-$2')
            .replace(/(-\d{2})\d+?$/, '$1'),
        
        telefone: (v) => v.replace(/\D/g, '')
            .replace(/^(\d{2})(\d)/, '($1) $2')
            .replace(/(\d)(\d{4})$/, '$1-$2')
            .slice(0, 15), 

        cep: (v) => v.replace(/\D/g, '')
            .replace(/^(\d{5})(\d)/, '$1-$2')
            .slice(0, 9)
    };

    useEffect(() => {
        carregarDados();
    },);

    const carregarDados = async () => {
        try {
            const usuarioLogado = JSON.parse(localStorage.getItem('usuario'));
            const clienteId = usuarioLogado?.cliente?.id || usuarioLogado?.clienteId || 1;

            const response = await ClienteService.buscarPorId(clienteId);
            const dados = response.data;
            
            if (!dados.endereco) {
                dados.endereco = { logradouro: "", numero: "", bairro: "", cidade: "", unidadeFederativa: "", cep: "", complemento: "" };
            }
            
            setFormData(dados);
        } catch (error) {
            console.error("Erro ao carregar configurações:", error);
            showFeedback("Erro ao carregar dados da instituição.", "error");
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        
        let finalValue = value;
        if (name === "cnpj") finalValue = masks.cnpj(value);
        if (name === "telefone") finalValue = masks.telefone(value);

        setFormData(prev => ({
            ...prev,
            [name]: finalValue
        }));
    };

    const handleAddressChange = (e) => {
        const { name, value } = e.target;
        
        let finalValue = value;
        if (name === "cep") finalValue = masks.cep(value);

        setFormData(prev => ({
            ...prev,
            endereco: {
                ...prev.endereco,
                [name]: finalValue
            }
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    };

    const salvarConfiguracoes = async () => {
        setSaving(true);
        try {
            
            if (!formData.nome || !formData.cnpj || !formData.email) {
                showFeedback("Preencha os campos obrigatórios.", "warning");
                setSaving(false);
                return;
            }

            await ClienteService.atualizar(formData);
            showFeedback("Dados atualizados com sucesso!", "success");

        } catch (error) {
            console.error("Erro ao salvar:", error);
            const msg = error.response?.data?.message || "Erro ao atualizar dados.";
            showFeedback(msg, "error");
        } finally {
            setSaving(false);
        }
    };

    const showFeedback = (message, severity) => {
        setFeedback({ open: true, message, severity });
    };

    if (loading) return <div className="p-10 text-center"><CircularProgress /></div>;

    return (
        <div className="p-5 max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-6 text-gray-800">Configurações da Instituição</h1>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 space-y-6">
                
                <div>
                    <h2 className="text-lg font-semibold mb-4 text-blue-600 border-b pb-2">Dados Gerais</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block mb-2 font-medium text-gray-700">Nome da Instituição</label>
                            <input
                                type="text"
                                name="nome"
                                value={formData.nome || ""}
                                onChange={handleChange}
                                className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block mb-2 font-medium text-gray-700">CNPJ</label>
                            <input
                                type="text"
                                name="cnpj"
                                value={formData.cnpj || ""}
                                onChange={handleChange}
                                maxLength={18}
                                className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                            />
                        </div>
                        <div>
                            <label className="block mb-2 font-medium text-gray-700">Email Corporativo</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email || ""}
                                onChange={handleChange}
                                className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block mb-2 font-medium text-gray-700">Telefone</label>
                            <input
                                type="text"
                                name="telefone"
                                value={formData.telefone || ""}
                                onChange={handleChange}
                                maxLength={15}
                                className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>
                </div>

                <div>
                    <h2 className="text-lg font-semibold mb-4 text-blue-600 border-b pb-2">Endereço</h2>
                    <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
                        <div className="md:col-span-2">
                            <label className="block mb-2 font-medium text-gray-700">CEP</label>
                            <input
                                type="text"
                                name="cep"
                                value={formData.endereco.cep || ""}
                                onChange={handleAddressChange}
                                maxLength={9}
                                className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="md:col-span-3">
                            <label className="block mb-2 font-medium text-gray-700">Cidade</label>
                            <input
                                type="text"
                                name="cidade"
                                value={formData.endereco.cidade || ""}
                                onChange={handleAddressChange}
                                className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                         <div className="md:col-span-1">
                            <label className="block mb-2 font-medium text-gray-700">UF</label>
                            <select
                                name="unidadeFederativa"
                                value={formData.endereco.unidadeFederativa || ""}
                                onChange={handleAddressChange}
                                className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">Selecione</option>
                                <option value="SP">SP</option>
                                <option value="RJ">RJ</option>
                                <option value="MG">MG</option>
                                <option value="BA">BA</option>
                                <option value="RS">RS</option>
                            </select>
                        </div>
                        <div className="md:col-span-4">
                            <label className="block mb-2 font-medium text-gray-700">Logradouro</label>
                            <input
                                type="text"
                                name="logradouro"
                                value={formData.endereco.logradouro || ""}
                                onChange={handleAddressChange}
                                className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block mb-2 font-medium text-gray-700">Número</label>
                            <input
                                type="text"
                                name="numero"
                                value={formData.endereco.numero || ""}
                                onChange={handleAddressChange}
                                className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="md:col-span-3">
                            <label className="block mb-2 font-medium text-gray-700">Bairro</label>
                            <input
                                type="text"
                                name="bairro"
                                value={formData.endereco.bairro || ""}
                                onChange={handleAddressChange}
                                className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="md:col-span-3">
                            <label className="block mb-2 font-medium text-gray-700">Complemento</label>
                            <input
                                type="text"
                                name="complemento"
                                value={formData.endereco.complemento || ""}
                                onChange={handleAddressChange}
                                className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>
                </div>

                <div className="flex justify-end pt-4">
                    <button 
                        onClick={salvarConfiguracoes}
                        disabled={saving}
                        className="px-6 py-3 bg-green-600 text-white rounded hover:bg-green-700 transition-colors font-medium disabled:opacity-50 flex items-center"
                    >
                        {saving ? "Salvando..." : "Salvar Configurações"}
                    </button>
                </div>
            </div>

            <Snackbar 
                open={feedback.open} 
                autoHideDuration={6000} 
                onClose={() => setFeedback({...feedback, open: false})}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <Alert severity={feedback.severity} variant="filled">
                    {feedback.message}
                </Alert>
            </Snackbar>
        </div>
    );
}