import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { InviteGuestModal } from "./invite-guest-modal";
import { ConfirmTripModal } from "./confirm-trip-modal";
import { DestinationAndDateStep } from "./stepes/destination-and-date-step";
import { InviteGuestStep } from "./stepes/invite-guest-step";
import { DateRange } from "react-day-picker";
import { api } from "../../lib/axios";

export function CreateTripPage() {

  const [isGuestsInputOpen, setIsGuestsInputOpen] = useState(false);
  const [isGuestsModalOpen, setIsGuestsModalOpen] = useState(false);
  const [isConfirmTripModalOpen, setIsConfirmTripModalOpen] = useState(false);

  const [destination, setDestination] = useState('');
  const [ownerName, setOwenerName] = useState("");
  const [ownerEmail, setOwenerEmail] = useState("");
  const [eventStartAndDates, setEventStartAndDates] = useState<DateRange | undefined>();

  const navigate = useNavigate();

  const [emailsToInvite, setEmailsToInvite] = useState([
    'diego@rocketseat.com.br',
    'john@acme.com'
  ]);

  function openGuestsInput() {
    setIsGuestsInputOpen(true);
  }

  function closeGuestsInput() {
    setIsGuestsInputOpen(false);
  }

  function openGuestsModal() {
    setIsGuestsModalOpen(true);
  }

  function closeGuestsModal() {
    setIsGuestsModalOpen(false);
  }

  function openConfirmTripModal() {
    setIsConfirmTripModalOpen(true);
  }

  function closeConfirmTripModall() {
    setIsConfirmTripModalOpen(false);
  }

  function isValidDateRange(dateRange: DateRange | undefined) {
    if (!dateRange || !dateRange.from || !dateRange.to) {
      return false;
    }
    const now = new Date();
    return dateRange.from >= now && dateRange.to >= now;
  }

  async function createTrip(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    console.log(destination);
    console.log(eventStartAndDates);
    console.log(emailsToInvite);
    console.log(ownerEmail);
    console.log(ownerName);

    if (!destination) {
      return;
    }
    if (!eventStartAndDates?.from || !eventStartAndDates?.to || !isValidDateRange(eventStartAndDates)) {
      alert("Por favor, selecione um intervalo de datas válido.");
      return;
    }
    if (emailsToInvite.length === 0) {
      return;
    }
    if (!ownerEmail || !ownerName) {
      return;
    }

    try {
      const response = await api.post('/trips', {
        destination,
        starts_at: eventStartAndDates.from,
        ends_at: eventStartAndDates.to,
        emails_to_invite: emailsToInvite,
        owner_name: ownerName,
        owner_email: ownerEmail
      });
      const { tripId } = response.data;
      navigate(`/trips/${tripId}`);
    } catch (error) {
      console.error("Error creating trip:", error);
      alert("Erro ao criar a viagem. Por favor, tente novamente.");
    }
  }

  function addNewEmailToInvite(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const email = data.get('email')?.toString();

    if (!email) {
      return;
    }

    if (emailsToInvite.includes(email)) {
      return;
    }

    setEmailsToInvite([
      ...emailsToInvite,
      email
    ]);

    event.currentTarget.reset();
  }

  function removeEmailFromInvites(emailToRemove: string) {
    const newEmailList = emailsToInvite.filter(email => email !== emailToRemove);

    setEmailsToInvite(newEmailList);
  }

  return (
    <div className="h-screen flex items-center justify-center bg-pattern bg-no-repeat bg-center">
      <div className="max-w-3xl w-full px-6 text-center space-y-10">
        <div className="flex flex-col items-center gap-3">
          <img src="/logo.svg" alt="plann.er" />
          <p className="text-zinc-300 text-lg">
            Convide seus amigos e planeje sua próxima viagem!
          </p>
        </div>

        <div className="space-y-4">
          <DestinationAndDateStep
            closeGuestsInput={closeGuestsInput}
            isGuestsInputOpen={isGuestsInputOpen}
            openGuestsInput={openGuestsInput}
            setDestination={setDestination}
            eventStartAndDates={eventStartAndDates}
            setEventStartAndDates={setEventStartAndDates}
          />

          {isGuestsInputOpen && (
            <InviteGuestStep
              emailsToInvite={emailsToInvite}
              openConfirmTripModal={openConfirmTripModal}
              openGuestsModal={openGuestsModal}
            />
          )}
        </div>

        <p className="text-sm text-zinc-500">
          Ao planejar sua viagem pela plann.er você automaticamente concorda <br />
          com nossos <a className="text-zinc-300 underline" href="#">termos de uso</a> e <a className="text-zinc-300 underline" href="#">políticas de privacidade</a>.
        </p>
      </div>

      {isGuestsModalOpen && (
        <InviteGuestModal
          emailsToInvite={emailsToInvite}
          addNewEmailToInvite={addNewEmailToInvite}
          closeGuestsModal={closeGuestsModal}
          removeEmailFromInvites={removeEmailFromInvites}
        />
      )}

      {isConfirmTripModalOpen && (
        <ConfirmTripModal
          closeConfirmTripModall={closeConfirmTripModall}
          createTrip={createTrip}
          setOwnerName={setOwenerName}
          setOwenerEmail={setOwenerEmail}
        />
      )}
    </div>
  );
}