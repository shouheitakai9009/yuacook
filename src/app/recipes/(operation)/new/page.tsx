"use client";

import { Button } from "@/components/shadcn/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/shadcn/ui/form";
import { Input } from "@/components/shadcn/ui/input";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/shadcn/ui/select";
import { Trash } from "lucide-react";
import { cn } from "@/lib/utils";
import { TextField } from "@/components/ui/TextField";
import { ErrorMessage } from "@/components/ui/ErrorMessage";

const units = ["g", "ml", "cc", "本", "袋", "丁", "パック", "切れ"] as const;

type Material = {
  name: string;
  amount: string;
  unit: (typeof units)[number];
};

type Recipe = {
  recipeName: string;
  image: FileList;
  materials: Material[];
};

const defaultMaterial: Material = {
  name: "",
  amount: "",
  unit: "g",
};

export default function RecipesNewPage() {
  const formSchema = z.object({
    recipeName: z.string().min(1, "レシピ名を入力してください"),
    image: z.custom<FileList>().refine((file) => file.length !== 0, {
      message: "レシピ画像をアップロードしてください",
    }),
    materials: z.array(
      z.object({
        name: z.string().min(1, "材料名を入力してください"),
        amount: z.string().min(1, "分量を入力してください"),
        unit: z.enum(units),
      })
    ),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      recipeName: "",
      materials: [defaultMaterial],
    },
  });

  // useFieldArrayの設定と関数の呼び出し
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "materials",
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  return (
    <div className="px-4 pt-4">
      <h1 className="text-2xl">新しいレシピを作る</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 py-4">
          <FormField
            control={form.control}
            name="recipeName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>レシピ名</FormLabel>
                <FormControl>
                  <TextField
                    placeholder="例）鶏胸肉のローストチキン"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="image"
            render={() => (
              <FormItem>
                <FormLabel>レシピ画像</FormLabel>
                <FormControl>
                  <Input type="file" {...form.register("image")} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormItem>
            <FormLabel>材料</FormLabel>
            {fields.map((_, index) => {
              const isLast = fields.length > 1 && fields.length - 1 === index;
              const errors = form.formState.errors.materials?.[index];
              const messages = errors
                ? Object.keys(errors).map(
                    (key) => errors[key as keyof Material]?.message ?? ""
                  )
                : [];
              return (
                <>
                  <section
                    key={index}
                    className={cn(
                      "pb-1 grid gap-1",
                      isLast
                        ? "grid-cols-[1fr_56px_96px_auto]"
                        : "grid-cols-[1fr_56px_96px]"
                    )}
                  >
                    <FormField
                      control={form.control}
                      name={`materials.${index}.name`}
                      render={({ fieldState }) => (
                        <FormItem>
                          <FormControl>
                            <TextField
                              placeholder="材料名を入力"
                              hasError={!!fieldState.error}
                              {...form.register(`materials.${index}.name`)}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`materials.${index}.amount`}
                      render={({ fieldState }) => (
                        <FormItem>
                          <FormControl>
                            <TextField
                              placeholder="分量"
                              hasError={!!fieldState.error}
                              className="w-14"
                              {...form.register(`materials.${index}.amount`)}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`materials.${index}.unit`}
                      render={({ field, fieldState }) => (
                        <FormItem>
                          <FormControl>
                            <Select
                              onValueChange={field.onChange}
                              {...form.register(`materials.${index}.unit`)}
                            >
                              <SelectTrigger
                                className={cn(
                                  "w-24",
                                  fieldState.error &&
                                    "border-red-500 placeholder:text-red-500"
                                )}
                              >
                                <SelectValue placeholder="g" />
                              </SelectTrigger>
                              <SelectContent>
                                {units.map((unit, index) => (
                                  <SelectItem key={index} value={unit}>
                                    {unit}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    {isLast && (
                      <Button
                        type="button"
                        className="bg-red-400"
                        onClick={() => remove(index)}
                      >
                        <Trash size={14} />
                      </Button>
                    )}
                  </section>
                  <ErrorMessage body={messages} />
                </>
              );
            })}
            <div className="flex justify-center">
              <Button
                type="button"
                variant="ghost"
                onClick={() => append(defaultMaterial)}
              >
                食材を追加
              </Button>
            </div>
          </FormItem>
          <div className="py-6 flex justify-center">
            <Button type="submit" size="lg">
              新しいレシピを作る
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
