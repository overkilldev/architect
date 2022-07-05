import { Menu, Transition } from "@headlessui/react";
import React, { Fragment, memo } from "react";

import { ArchiveActiveIcon } from "./NodeContextMenu.helpers";
import { ArchiveInactiveIcon } from "./NodeContextMenu.helpers";
import { DeleteActiveIcon } from "./NodeContextMenu.helpers";
import { DeleteInactiveIcon } from "./NodeContextMenu.helpers";
import { DuplicateActiveIcon } from "./NodeContextMenu.helpers";
import { DuplicateInactiveIcon } from "./NodeContextMenu.helpers";
import { EditActiveIcon, EditInactiveIcon } from "./NodeContextMenu.helpers";
import { MoveActiveIcon, MoveInactiveIcon } from "./NodeContextMenu.helpers";
import { NodeContextMenuProps as Props } from "./NodeContextMenu.types";
import useTreeStore from "contexts/tree/tree.context";

import { ReactComponent as DotsSVG } from "/public/dots.svg";

const NodeContextMenu: React.FC<Props> = props => {
  const { node, onEdit } = props;
  const deleteNode = useTreeStore(state => state.deleteNode);

  return (
    <Menu as="div" className="relative inline-flex text-left">
      <Menu.Button>
        <div className="px-2 py-1">
          <DotsSVG />
        </div>
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-[-8px] mt-8 w-48 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-md shadow-gray-700 ring-1 ring-white ring-opacity-5 focus:outline-none">
          <div className="px-1 py-1 ">
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={onEdit}
                  className={`${
                    active ? "bg-violet-500 text-white" : "text-gray-900"
                  } group flex w-full items-center rounded-md px-2 py-2 text-xs`}
                >
                  {active ? (
                    <EditActiveIcon
                      className="mr-1 h-4 w-4"
                      aria-hidden="true"
                    />
                  ) : (
                    <EditInactiveIcon
                      className="mr-1 h-4 w-4"
                      aria-hidden="true"
                    />
                  )}
                  Edit
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${
                    active ? "bg-violet-500 text-white" : "text-gray-900"
                  } group flex w-full items-center rounded-md px-2 py-2 text-xs`}
                >
                  {active ? (
                    <DuplicateActiveIcon
                      className="mr-1 h-4 w-4"
                      aria-hidden="true"
                    />
                  ) : (
                    <DuplicateInactiveIcon
                      className="mr-1 h-4 w-4"
                      aria-hidden="true"
                    />
                  )}
                  Duplicate
                </button>
              )}
            </Menu.Item>
          </div>
          <div className="px-1 py-1">
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${
                    active ? "bg-violet-500 text-white" : "text-gray-900"
                  } group flex w-full items-center rounded-md px-2 py-2 text-xs`}
                >
                  {active ? (
                    <ArchiveActiveIcon
                      className="mr-1 h-4 w-4"
                      aria-hidden="true"
                    />
                  ) : (
                    <ArchiveInactiveIcon
                      className="mr-1 h-4 w-4"
                      aria-hidden="true"
                    />
                  )}
                  Archive
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${
                    active ? "bg-violet-500 text-white" : "text-gray-900"
                  } group flex w-full items-center rounded-md px-2 py-2 text-xs`}
                >
                  {active ? (
                    <MoveActiveIcon
                      className="mr-1 h-4 w-4"
                      aria-hidden="true"
                    />
                  ) : (
                    <MoveInactiveIcon
                      className="mr-1 h-4 w-4"
                      aria-hidden="true"
                    />
                  )}
                  Move
                </button>
              )}
            </Menu.Item>
          </div>
          <div className="px-1 py-1">
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={() => deleteNode(node)}
                  className={`${
                    active ? "bg-violet-500 text-white" : "text-gray-900"
                  } group flex w-full items-center rounded-md px-2 py-2 text-xs`}
                >
                  {active ? (
                    <DeleteActiveIcon
                      className="mr-1 h-4 w-4 text-violet-400"
                      aria-hidden="true"
                    />
                  ) : (
                    <DeleteInactiveIcon
                      className="mr-1 h-4 w-4 text-violet-400"
                      aria-hidden="true"
                    />
                  )}
                  Delete
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

NodeContextMenu.defaultProps = {};

export default memo(NodeContextMenu);
