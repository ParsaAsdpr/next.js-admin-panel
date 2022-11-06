import Link from "next/link";
import React from "react";
import Layout from "../components/Layout";
import { MdModeEdit, MdDeleteForever } from "react-icons/md";

export default function table() {
  return (
    <Layout title="داشبورد">
      <div className="py-4 px-10 flex flex-col">
        <div className="grid grid-cols-4 gap-10"></div>
        <div className="mt-5 rounded-t-xl overflow-hidden">
          <ul className="bg-teal-500 text-stone-100 text-lg text-center w-full px-5 py-5 grid grid-cols-8 gap-2">
            <li>نام</li>
            <li className="col-span-2">ایمیل</li>
            <li>وضعیت</li>
            <li>دسته بندی</li>
            <li>آخرین وضعیت</li>
            <li>پروفایل</li>
            <li>مدیریت</li>
          </ul>

          <ul className="bg-white border-b border-b-stone-200 text-stone-800 text-base text-center w-full px-5 py-5 grid grid-cols-8 gap-2">
            <li>ممد</li>
            <li className="col-span-2">mamad@email.com</li>
            <li>آفلاین</li>
            <li>کاربر</li>
            <li>۱۲ مهر ۱۴۰۰</li>
            <li>
              <Link href="#">
                <a className="underline text-blue-600">مشاهده پروفایل</a>
              </Link>
            </li>
            <li className="flex flex-row gap-5 items-center text-3xl justify-center">
              <MdDeleteForever className="text-red-500 cursor-pointer" />{" "}
              <MdModeEdit className="cursor-pointer" />
            </li>
          </ul>
          
        </div>
      </div>
    </Layout>
  );
}
