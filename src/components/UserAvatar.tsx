import { User } from "next-auth";
import Image from "next/image";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface Props {
  user: Pick<User, "name" | "image">;
}

const UserAvatar = ({ user, ...props }: Props) => {
  return (
    <Avatar {...props}>
      {user.image ? (
        <Image
          fill
          src={user.image}
          alt="Profile Picture"
          referrerPolicy="no-referrer"
        />
      ) : (
        <AvatarFallback>
          <span className="sr-only">{user?.name}</span>
        </AvatarFallback>
      )}
    </Avatar>
  );
};

export default UserAvatar;
