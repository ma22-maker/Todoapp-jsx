"use client";
import { IoPerson } from "react-icons/io5";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {MdOutlineTaskAlt} from "react-icons/md"
import {MdOutlinePendingActions} from "react-icons/md"
import {BiMessageSquareAdd} from "react-icons/bi"
import React from "react";
import{AiFillHome}from "react-icons/ai"

const sidebarItems = [
  {
    name: " Home",
    href: "/",
    icon: AiFillHome,
  },
  {
    name: " Add Task",
    href: "/addtask",
    icon: BiMessageSquareAdd,
  },
  {
    name: "Pending Tasks",
    href: "/pendingtasks",
    icon: MdOutlinePendingActions,
  },
  {
    name: "Completed Tasks",
    href: "/completedtasks",
    icon: MdOutlineTaskAlt,
  },
];

const Sidebar = () => {
  const currentPath = usePathname();

  return (
    <div className="sidebar__wrapper">
      <aside className="sidebar">
      <div className="flex items-center mb-12">
          <IoPerson className="sidebar__logo" />
          <h1 className="sidebar__logo-name">Hello, there</h1>
        </div>
        <ul className="sidebar__list">
          {sidebarItems.map(({ name, href, icon: Icon }) => {
            return (
              <li className="sidebar__item" key={name}>
                <Link
                  className={`sidebar__link ${
                    currentPath === href ? "sidebar__link--active" : ""
                  }`}
                  href={href}
                >
                  <span className="sidebar__icon">
                    <Icon />
                  </span>
                  <span className="sidebar__name">{name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </aside>
    </div>
  );
};

export default Sidebar;
