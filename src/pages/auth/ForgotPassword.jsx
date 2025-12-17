import { Link } from "react-router";
import { TextField, Button, InputAdornment } from "@mui/material";
import { Email } from "@mui/icons-material";

export default function ForgotPassword() {
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
                        <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">Recuperar senha</h2>
                        <p className="text-gray-600 mb-4 text-center">Digite o email cadastrado para receber um link de recuperação de senha.</p>
                        <form className="flex flex-col gap-4">
                            <div>
                                <TextField
                                    label="Email"
                                    type="email"
                                    fullWidth
                                    variant="outlined"
                                    placeholder="Digite seu email"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <Email />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </div>
                            <Button
                                type="submit"
                                variant="contained"
                                fullWidth
                                className="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition-colors"
                            >
                                Enviar email de recuperação
                            </Button>
                        </form>
                        <div className="mt-4 text-center">
                            <Link to="/login" className="text-blue-600 hover:underline">
                                Voltar
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
