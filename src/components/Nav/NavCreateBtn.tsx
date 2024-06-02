"use client";
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Input,
  Option,
  Select,
  Typography,
} from "@material-tailwind/react";
import React, { useState, useRef, useEffect } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Editor } from "@tinymce/tinymce-react";
import * as z from "zod";
import { getUsers } from "@/app/actions/users";
import { User } from "@prisma/client";

interface CreateTicketFields {
  title: string;
  assignee: string;
  description?: string;
  storyPoints?: number;
}

const NavCreateBtn = () => {
  const [openCreateModal, setOpenModal] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const editorRef = useRef<unknown | null>(null);
  const schema = z.object({
    title: z.string().min(5),
    assignee: z.string().min(5),
    description: z.string().optional(),
    storyPoints: z.number().optional(),
  });
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<CreateTicketFields>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      description: "",
      storyPoints: 0,
    },
  });
  const handleModalOpen = () => setOpenModal(true);
  const handleModalClose = () => setOpenModal(false);
  const handleCreateTicketSubmit: SubmitHandler<CreateTicketFields> = (
    data
  ) => {
    console.log(data);
  };

  useEffect(() => {
    const fetchUsers = async () => {
        const users = await getUsers();
        setUsers(users);
    }
    fetchUsers();
  }, [])
  return (
    <>
      <button
        onClick={handleModalOpen}
        className="button-create text-black p-2 border rounded font-semibold border-none"
      >
        Create
      </button>
      <Dialog
        open={openCreateModal}
        placeholder="Create Ticket"
        dismiss={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
        handler={() => {}}
      >
        <DialogHeader
          placeholder="Create Ticket Header"
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          Create a ticket
        </DialogHeader>
        <form onSubmit={handleSubmit(handleCreateTicketSubmit)}>
          <DialogBody
            placeholder="Create Ticket Body"
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            <Typography
              variant="h4"
              color="blue-gray"
              className="mt-3"
              placeholder={""}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              Add Ticket Title
            </Typography>
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Enter Ticket Title"
                  crossOrigin={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                />
              )}
            />
            <Typography
              variant="h6"
              className="mt-3 text-red-600"
              placeholder={""}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              {errors.title?.message}
            </Typography>
            <Typography
              variant="h4"
              color="blue-gray"
              className="mt-3"
              placeholder={""}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              Add Assignee
            </Typography>
            <Controller
              name="assignee"
              control={control}
              render={({ field }) => (
                <Select
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                  {...field}
                  placeholder="Select Assignee"
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                  menuProps={{ className: "h-48" }}
                >
                  {users.map((user, index) => (
                    <Option key={index} value={user.id}>
                      <div className="flex items-center gap-x-2">{user.name}</div>
                    </Option>
                  ))}
                </Select>
              )}
            />
            <Typography
              variant="h6"
              className="mt-3 text-red-600"
              placeholder={""}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              {errors.assignee?.message}
            </Typography>
            <Typography
              variant="h4"
              color="blue-gray"
              className="mt-3"
              placeholder={""}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              Add Ticket Description
            </Typography>
            <Controller
              name="description"
              control={control}
              render={({ field: { onChange } }) => (
                <Editor
                  apiKey={process.env.NEXT_PUBLIC_TINY_KEY}
                  onInit={(_evt, editor) => (editorRef.current = editor)}
                  initialValue=""
                  onEditorChange={onChange}
                  init={{
                    height: 400,
                    menubar: false,
                    plugins: [
                      "advlist",
                      "autolink",
                      "lists",
                      "link",
                      "image",
                      "charmap",
                      "preview",
                      "anchor",
                      "searchreplace",
                      "visualblocks",
                      "code",
                      "fullscreen",
                      "insertdatetime",
                      "media",
                      "table",
                      "codesample",
                      "help",
                      "wordcount",
                    ],
                    toolbar:
                      "undo redo | styles | bold italic underline strikethrough codesample | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image",
                    content_style:
                      "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                  }}
                />
              )}
            />
            <Typography
              variant="h6"
              className="mt-3 text-red-600"
              placeholder={""}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              {errors.description?.message}
            </Typography>
            <Typography
              variant="h4"
              color="blue-gray"
              className="mt-3"
              placeholder={""}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              Add Story Points
            </Typography>
            <Input
              type="number"
              placeholder="Add Story Points"
              crossOrigin={undefined}
              {...register("storyPoints", {
                valueAsNumber: true,
              })}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            />
            <Typography
              variant="h6"
              className="mt-3 text-red-600"
              placeholder={""}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              {errors.storyPoints?.message}
            </Typography>
          </DialogBody>
          <DialogFooter
            placeholder="Create Ticket Footer"
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            <Button
              type="submit"
              placeholder="Confirm Button"
              variant="gradient"
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              <span>Confirm</span>
            </Button>
            <Button
              variant="text"
              placeholder="Cancel Button"
              color="red"
              className="mr-1"
              onClick={handleModalClose}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              <span>Cancel</span>
            </Button>
          </DialogFooter>
        </form>
      </Dialog>
    </>
  );
};

export { NavCreateBtn };
