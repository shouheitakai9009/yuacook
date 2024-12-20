"use client";

import { Button } from "@/components/shadcn/ui/button";
import { FormItem, FormLabel } from "@/components/shadcn/ui/form";
import { UseFormReturn, useFieldArray } from "react-hook-form";
import { Trash } from "lucide-react";
import { cn } from "@/libs/utils";
import { ErrorMessage } from "@/components/ui/ErrorMessage";
import { FormType } from "../../schema";
import { Material } from "@/types/material";
import { defaultMaterial } from "../../Form";
import { NameField } from "./NameField";
import { AmountField } from "./AmountField";
import { UnitField } from "./UnitField";
import { useCallback } from "react";

interface Props {
  form: UseFormReturn<FormType, any, undefined>;
}

const FieldWrapper = ({
  children,
  index,
  isLast,
}: React.PropsWithChildren<{
  index: number;
  isLast: boolean;
}>): React.JSX.Element => (
  <div
    key={index}
    className={cn("pb-1 grid gap-1", isLast ? "grid-cols-[1fr_auto_auto_auto]" : "grid-cols-[1fr_auto_auto]")}
  >
    {children}
  </div>
);

export const MaterialsField: React.FC<Props> = ({ form }) => {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "materials",
  });

  const getFieldState = useCallback(
    (index: number) => {
      const isLast = fields.length > 1 && fields.length - 1 === index;
      const errors = form.formState.errors.materials?.[index];
      const messages = errors ? Object.keys(errors).map((key) => errors[key as keyof Material]?.message ?? "") : [];
      return {
        isLast,
        messages,
      };
    },
    [fields.length, form.formState.errors.materials],
  );

  return (
    <FormItem>
      <FormLabel>材料</FormLabel>
      {fields.map((_, index) => {
        const { isLast, messages } = getFieldState(index);
        return (
          <section key={index}>
            <FieldWrapper index={index} isLast={isLast}>
              <NameField index={index} form={form} />
              <AmountField index={index} form={form} />
              <UnitField index={index} form={form} />
              {isLast && (
                <Button type="button" className="px-2" variant="ghost" onClick={() => remove(index)}>
                  <Trash size={20} />
                </Button>
              )}
            </FieldWrapper>
            <ErrorMessage body={messages} />
          </section>
        );
      })}
      <div className="flex justify-center">
        <Button type="button" variant="ghost" onClick={() => append(defaultMaterial)}>
          食材を追加
        </Button>
      </div>
    </FormItem>
  );
};
