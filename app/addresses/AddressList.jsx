"use client";

import { useState } from "react";
import { deleteAddress } from "./EditAddress";
import UpdateNavigation from "@/components/navigation/UpdateNavigation";
import { Button } from "@/components/ui/button";
import { MdDeleteForever } from "react-icons/md";
import { toast } from "sonner";
import AddressCreate from "./AddressCreate";
import AddressUpdate from "./AddressUpdate";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";

const AddressList = ({ addresses }) => {
  const navigationItems = [{ label: "آدرس های من", href: "/addresses" }];
  const [Addresses, setAddresses] = useState(addresses);

  return (
    <>
      <UpdateNavigation items={navigationItems} />
      <div dir="rtl" className="flex flex-col gap-5">
        <AddressCreate setAddresses={setAddresses} />

        <div dir="rtl" className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {Addresses.length >= 1 ? (Addresses.map((address) => (
            <Card dir="rtl" key={address.id} className=" col-span-1">
              <CardHeader>
                <CardTitle>
                  <p className="lg:text-lg text-base">{address.title}</p>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="lg:text-base text-sm">{address.address}</p>
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
                      <DialogHeader className="sm:text-right">
                        <DialogTitle>آدرس زیر حذف شود؟</DialogTitle>
                      </DialogHeader>
                      <Button
                        variant="destructive"
                        onClick={async () => {
                          const status = await deleteAddress(address.id);
                          if (status === 200) {
                            toast.info("آدرس شما با موفقیعت حذف شد");
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

                  <AddressUpdate
                    addressData={address}
                    setAddresses={setAddresses}
                  />
                </div>
              </CardFooter>
            </Card>
          ))) : (
            <p className="text-md lg:text-lg">آدرسی ثبت نشده</p>
          )}
        </div>
      </div>
    </>
  );
};

export default AddressList;
