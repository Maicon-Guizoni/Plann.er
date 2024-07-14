import { User, X } from "lucide-react";
import type { FormEvent } from "react";

interface ConfirmTripModalProps {
  closeConfirmTripModall: () => void
  setOwnerName: (name: string) => void
  setOwenerEmail: (email:string) => void
    createTrip: (event: FormEvent<HTMLFormElement>) => void
}

export function ConfirmTripModal( props: ConfirmTripModalProps) {
    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
        <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h2 className="font-lg font-semibold">Confirmar criação de viagem</h2>
              <button type='button'>
                <X className="size-5 text-zinc-400" onClick={props.closeConfirmTripModall} />
              </button>
            </div>

            <p className="text-sm text-zinc-400">
              Pra concluir a criação da viagem para <span className="font-senbold text-zinc-100">Florianopolis, Brasil</span> nas datas de <span className="font-senbold text-zinc-100">16 e 27 de Agosto de 2024</span>, preencha seus dados abaixo:
            </p>
          </div>


          <form onSubmit={props.createTrip} className="space-y-3">
            <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
              <User className="text-zinc-400 size-5" />
              <input
                type="text"
                name="name"
                placeholder="Seu nome completo"
                className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
                onChange={event =>props.setOwnerName(event.target.value)}
              />
            </div>

            <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
              <User className="text-zinc-400 size-5" />
              <input
                type="email"
                name="email"
                placeholder="Seu email pessoal"
                className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
                onChange={event => props.setOwenerEmail(event.target.value)}
              />
            </div>

            <button type="submit" className="bg-lime-300 w-full justify-center text-lime-950 rounded-lg px-5 h-11 font-medium flex items-center gap-2 hover:bg-lime-400">
              Confirmar viagem
            </button>
          </form>
        </div>
      </div>

    )

}