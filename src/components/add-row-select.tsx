import { Button } from "@heroui/button";
import { Select, SelectItem } from "@heroui/select";
import { Check } from "lucide-react";
import { useState } from "react";

type KeyLabelPair = {
  key: number;
  label: string;
};

type AddRowSelectProps = {
  options: KeyLabelPair[];
  onSend: (value?: string) => void;
};

export default function AddRowSelect({ options, onSend }: AddRowSelectProps) {
  const [value, setValue] = useState<string>();

  return (
    <section className="flex gap-8 print:hidden">
      <Select
        variant="bordered"
        onChange={(event) => setValue(event.target.value)}
      >
        {options.map((option) => (
          <SelectItem key={option.key} variant="bordered">
            {option.label}
          </SelectItem>
        ))}
      </Select>
      <Button color="success" onPress={() => onSend(value)}>
        <Check />
      </Button>
    </section>
  );
}
