import { useState } from "react";
import { Link, useNavigate } from "react-router";
import {
    TextField,
    Button,
    InputAdornment,
    Alert,
    CircularProgress,
} from "@mui/material";
import { Email, Lock } from "@mui/icons-material";
import { AuthService } from "../../services/AuthService";

export default function Login() {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [senha, setSenha] = useState("");
    const [loading, setLoading] = useState(false);
    const [erro, setErro] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        setErro("");
        setLoading(true);

        try {
            await AuthService.login(username, senha);

            navigate("/dashboard");
        } catch (error) {
            setErro("Usuário ou senha incorretos.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="min-h-screen min-w-screen flex items-center justify-center bg-gray-100">
                <div className="bg-white rounded-lg shadow-md w-full max-w-4xl flex overflow-hidden">
                    <div className="hidden md:block w-1/2 border-r border-gray-600">
                        {/*Pegar a Imagem do Figma*/}
                        <img
                            src=""
                            alt="Geriatricare"
                            className="object-cover w-full h-[50vh]"
                        />
                    </div>
                    <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
                        <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">
                            Login
                        </h2>

                        {erro && (
                            <Alert severity="error" className="mb-4">
                                {erro}
                            </Alert>
                        )}

                        <form
                            onSubmit={handleLogin}
                            className="flex flex-col gap-4"
                        >
                            <div>
                                <TextField
                                    label="Usuário"
                                    type="text"
                                    fullWidth
                                    variant="outlined"
                                    placeholder="Digite seu usuário"
                                    value={username}
                                    onChange={(e) =>
                                        setUsername(e.target.value)
                                    }
                                    required
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <Email />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </div>
                            <div>
                                <TextField
                                    label="Senha"
                                    type="password"
                                    fullWidth
                                    variant="outlined"
                                    placeholder="Digite sua senha"
                                    value={senha}
                                    onChange={(e) => setSenha(e.target.value)}
                                    required
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <Lock />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </div>

                            <Button
                                type="submit"
                                variant="contained"
                                fullWidth
                                disabled={loading}
                                className="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition-colors"
                            >
                                {loading ? (
                                    <CircularProgress
                                        size={24}
                                        color="inherit"
                                    />
                                ) : (
                                    "Entrar"
                                )}
                            </Button>
                        </form>

                        <div className="mt-4 text-center">
                            <Link
                                to="/recuperar-senha"
                                className="text-blue-600 hover:underline"
                            >
                                Esqueceu a senha?
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
