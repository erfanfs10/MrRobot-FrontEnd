"use client";

import { useState } from "react";
import { updateAddress, deleteAddress, createAddress } from "./EditAddress";
import UpdateNavigation from "@/components/navigation/UpdateNavigation";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MdDeleteForever } from "react-icons/md";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

const AddressList = ({ addresses }) => {
  const navigationItems = [{ label: "آدرس های من", href: "/addresses" }];
  const [Addresses, setAddresses] = useState(addresses);
  const [newAddress, setNewAddress] = useState({});

  return (
    <>
      <UpdateNavigation items={navigationItems} />
      <div dir="rtl" className="flex flex-col gap-5">
        <Dialog>
          <DialogTrigger asChild>
            <Button className="w-40 text-base lg:text-lg">ثبت آدرس جدید</Button>
          </DialogTrigger>
          <DialogContent dir="rtl">
            <DialogHeader>
              <DialogTitle>آدرس جدید خود را ثبت کنید</DialogTitle>
            </DialogHeader>
            <Textarea
              dir="rtl"
              className="text-base lg:text-lg"
              placeholder="نام آدرس: خانه ,محل کار ..."
              value={newAddress.title}
              onChange={(e) => {
                const newValue = e.target.value;
                setNewAddress((previous) => ({
                  ...previous,
                  title: newValue,
                }));
              }}
            />
            <Textarea
              dir="rtl"
              className="text-base lg:text-lg"
              placeholder="نشانی"
              value={newAddress.address}
              onChange={(e) => {
                const newValue = e.target.value;
                setNewAddress((previous) => ({
                  ...previous,
                  address: newValue,
                }));
              }}
            />
            <DialogClose asChild>
              <Button
                className="text-base lg:text-lg"
                onClick={async () => {
                  const { data: createdAddress, status } = await createAddress(
                    newAddress.title,
                    newAddress.address
                  );

                  if (status === 200) {
                    setAddresses((prev) => [...prev, createdAddress]);

                    toast("آدرس شما با موفقیعت ثبت شد");
                    setNewAddress({});
                  } else if (status === 400) {
                    toast("شما مجاز به ثبت حداکثر ۵ آدرس هستید");
                  } else {
                    toast("با عرض پوزش لطفا دوباره امتحان کنید");
                  }
                }}
              >
                ثبت
              </Button>
            </DialogClose>
          </DialogContent>
        </Dialog>

        <div dir="rtl" className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {Addresses.map((address) => (
            <Card dir="rtl" key={address.id} className=" col-span-1">
              <CardHeader>
                <Label className="mb-3 text-base lg:text-lg">نام آدرس</Label>
                <Textarea
                  dir="rtl"
                  className="text-base lg:text-lg min-h-12 max-h-12"
                  value={address.title}
                  onChange={(e) => {
                    const newValue = e.target.value;
                    setAddresses((prev) =>
                      prev.map((a) =>
                        a.id === address.id ? { ...a, title: newValue } : a
                      )
                    );
                  }}
                />
              </CardHeader>
              <CardContent>
                <Label className="mb-3 text-base lg:text-lg">نشانی</Label>
                {/* <ScrollArea className="h-[120px] rounded-md"> */}
                <Textarea
                  dir="rtl"
                  className="text-base lg:text-lg min-h-28 max-h-28"
                  value={address.address}
                  onChange={(e) => {
                    const newValue = e.target.value;
                    setAddresses((prev) =>
                      prev.map((a) =>
                        a.id === address.id ? { ...a, address: newValue } : a
                      )
                    );
                  }}
                />
                {/* </ScrollArea> */}
              </CardContent>
              <CardFooter>
                <div className="flex w-full justify-between items-center">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="destructive">
                        <p>حذف آدرس</p>
                        <MdDeleteForever className="size-6" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>آدرس زیر حذف شود؟</DialogTitle>
                      </DialogHeader>
                      <Button
                        variant="destructive"
                        onClick={async () => {
                          const status = await deleteAddress(address.id);
                          if (status === 200) {
                            toast("آدرس شما با موفقیعت حذف شد");
                            setAddresses((prev) =>
                              prev.filter((a) => a.id !== address.id)
                            );
                          } else {
                            toast("با عرض پوزش لطفا دوباره امتحان کنید");
                          }
                        }}
                      >
                        حذف آدرس
                      </Button>
                    </DialogContent>
                  </Dialog>
                  <Button
                    onClick={async () => {
                      const status = await updateAddress(
                        address.id,
                        address.address,
                        address.title
                      );
                      if (status === 200) {
                        toast("آدرس شما با موفقیعت آپدیت شد");
                      } else {
                        toast("با عرض پوزش لطفا دوباره امتحان کنید");
                      }
                    }}
                  >
                    ذخیره
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
};

export default AddressList;
