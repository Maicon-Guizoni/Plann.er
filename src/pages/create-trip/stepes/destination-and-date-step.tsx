import { ArrowRight, Calendar, MapPin, Settings2, X } from "lucide-react";
import { useState } from "react";
import { DayPicker, DateRange } from "react-day-picker";
import { format } from 'date-fns'
import "react-day-picker/dist/style.css";

interface DestinationAndDateStepProps {
  isGuestsInputOpen: boolean
  closeGuestsInput: () => void
  openGuestsInput: () => void
  setEventStartAndDates: (dates: DateRange | undefined) => void
  eventStartAndDates: DateRange | undefined 
  setDestination:(destination:string) => void
}

export function DestinationAndDateStep({
  isGuestsInputOpen,
  closeGuestsInput,
  openGuestsInput,
  setDestination,
  eventStartAndDates,
  setEventStartAndDates
}:DestinationAndDateStepProps) {

  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)
  function openDatePicker() {
    return setIsDatePickerOpen(true)
  }

  function closeDatePicker() {
    return setIsDatePickerOpen(false)
  }

  const displayedDate = eventStartAndDates && eventStartAndDates.from && eventStartAndDates.to ? format(eventStartAndDates.from, "d' de ' LLL").concat(` Até `).concat(format(eventStartAndDates.to, "d' de ' LLL")): null


  return (
    <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-3">
      <div className="flex items-center gap-2 flex-1">
        <MapPin className="size-5 text-zinc-400" />
        <input
          
          disabled={isGuestsInputOpen}
          type="text"
          placeholder="Para onde você vai?"
          className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
          onChange={event => setDestination(event.target.value)}
        />
      </div>

      <button onClick={openDatePicker} className="flex items-center gap-2 text-left w={240px]"
        disabled={isGuestsInputOpen}>
        <Calendar className="size-5 text-zinc-400" />
        <span className="text-lg placeholder-zinc-400 w-40 flex-1"
        >{displayedDate || `Quando?` }</span>
      </button>

      {isDatePickerOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
          <div className="rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h2 className="font-lg font-semibold">Selecina a data</h2>
                <button type='button' onClick={closeDatePicker} >
                  <X className="size-5 text-zinc-400" />
                </button>
              </div>
            </div>
            <DayPicker mode="range" selected={eventStartAndDates} onSelect={setEventStartAndDates}/>
          </div>
        </div>
      )
      }




      <div className="w-px h-6 bg-zinc-800" />

      {isGuestsInputOpen ? (
        <button onClick={closeGuestsInput} className="bg-zinc-800 text-zinc-200 rounded-lg px-5 py-2 font-medium flex items-center gap-2 hover:bg-zinc-700">
          Alterar local/data
          <Settings2 className="size-5" />
        </button>
      ) : (
        <button onClick={openGuestsInput} className="bg-lime-300 text-lime-950 rounded-lg px-5 py-2 font-medium flex items-center gap-2 hover:bg-lime-400">
          Continuar
          <ArrowRight className="size-5" />
        </button>
      )}
    </div>
  )
}