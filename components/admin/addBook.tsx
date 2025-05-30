"use client"

import { useForm } from "react-hook-form"
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { toast } from "sonner"

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  author: z.string().min(1, "Author is required"),
  genre: z.string().min(1, "Genre is required"),
  isbn: z
    .string()
    .min(10, "ISBN must be at least 10 characters")
    .max(13, "ISBN must be at most 13 characters"),
  totalCopies: z.coerce.number().min(1, "Must be at least 1"),
  cover: z
    .string()
    .url("Must be a valid URL")
    .default("https://via.placeholder.com/150")
    .optional(),
})

type BookFormValues = z.infer<typeof formSchema>

export function AddBookForm() {
  const [loading, setLoading] = useState(false)
  // const [coverUrl, setCoverUrl] = useState("")

  const form = useForm<BookFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      author: "",
      genre: "",
      isbn: "",
      totalCopies: 1,
      cover: "https://via.placeholder.com/150",
    }
  })

  const onSubmit = (data: BookFormValues) => {
    console.log("Submitted Book:", data)
    toast.success("Book added successfully!")
    // form.reset()
  }
  
  const onError = (errors: any) => {
    console.error("Form Errors:", errors)
  }
  


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit, onError)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="The Great Gatsby" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="author"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Author</FormLabel>
              <FormControl>
                <Input placeholder="F. Scott Fitzgerald" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="genre"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Genre</FormLabel>
              <FormControl>
                <Input placeholder="Classic, Fiction, Drama..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="isbn"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ISBN</FormLabel>
              <FormControl>
                <Input placeholder="9783161484100" {...field} />
              </FormControl>
              <FormDescription>
                Enter a 10 or 13-digit ISBN.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="totalCopies"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Total Copies</FormLabel>
              <FormControl>
                <Input type="number" min="1" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/*<FormItem>
          <FormLabel>Cover Image</FormLabel>
          <FormControl>
            <div className="space-y-4">
              <ImageUpload />
              {coverUrl && (
                <div className="mt-2">
                  <img src={coverUrl} alt="Book cover preview" className="max-h-40 rounded" />
                </div>
              )}
            </div>
          </FormControl>
          <FormDescription>
            Upload a cover image for the book.
          </FormDescription>
        </FormItem>*/}

        <Button type="submit" disabled={loading}>
          {loading ? "Adding..." : "Add Book"}
        </Button>
      </form>
    </Form>
  )
}

export default AddBookForm;