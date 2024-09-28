import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { askAI } from "../actions";

export default async function ProtectedPage() {
  return (
    <form className="w-full mt-32">
      <Input
        placeholder="Ask a question"
        className="w-80 mx-auto"
        name="prompt"
      />
      <div className="w-32 mx-auto mt-4">
        <SubmitButton formAction={askAI}>Ask</SubmitButton>
      </div>
    </form>
  );
}
