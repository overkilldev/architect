import { Menu, Transition } from "@headlessui/react";
import { Auth } from "aws-amplify";
import React, { Fragment } from "react";

import { AvatarProps as Props } from "./Avatar.types";
import SocialButton from "./SocialButton/SocialButton";

import { ReactComponent as GithubSVG } from "/public/github.svg";

const Avatar: React.FC<Props> = props => {
  const githubHandler = async () => {
    try {
      const user = await Auth.federatedSignIn({
        customProvider: "Github"
      });

      console.log({ user });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="Avatar">
      <Menu as="div">
        <Menu.Button>
          <div className="w-8 h-8 rounded-full bg-black border-[1px] border-violet-500"></div>
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
          <Menu.Items className="absolute right-8 p-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-stone-900 shadow-md shadow-gray-700 ring-1 ring-white ring-opacity-5 focus:outline-none">
            <Menu.Item>
              <SocialButton
                icon={<GithubSVG />}
                title="Sign in with Github"
                onClick={githubHandler}
              />
            </Menu.Item>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

Avatar.defaultProps = {};

export default Avatar;
