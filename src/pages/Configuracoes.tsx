
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const Configuracoes = () => {
  const [formData, setFormData] = useState({
    nomeClinica: "Clínica Íris",
    email: "contato@clinicairis.com",
    telefone: "(11) 3333-3333",
    endereco: "Rua das Flores, 123 - São Paulo, SP",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Implementar salvamento das configurações
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Configurações</h1>
        <p className="text-gray-600 mt-2">Gerencie as configurações do sistema</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Informações da Clínica</CardTitle>
            <CardDescription>
              Configure as informações básicas da sua clínica
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="nomeClinica">Nome da Clínica</Label>
              <Input
                id="nomeClinica"
                value={formData.nomeClinica}
                onChange={(e) =>
                  setFormData({ ...formData, nomeClinica: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="telefone">Telefone</Label>
              <Input
                id="telefone"
                value={formData.telefone}
                onChange={(e) =>
                  setFormData({ ...formData, telefone: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="endereco">Endereço</Label>
              <Textarea
                id="endereco"
                value={formData.endereco}
                onChange={(e) =>
                  setFormData({ ...formData, endereco: e.target.value })
                }
              />
            </div>

            <Button type="submit" className="w-full">
              Salvar Alterações
            </Button>
          </CardContent>
        </Card>
      </form>
    </div>
  );
};

export default Configuracoes;
