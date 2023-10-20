import { cn } from "@/lib/utils";
import { LogOut, UserIcon } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export default function User({
	user,
	side,
	className,
}: {
	user?: {
		id?: string;
		name?: string;
		image?: string;
	};
	logout?: boolean;
	side?: string;
	className?: string;
}) {
	const { data: session } = useSession();
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Avatar
					className={cn(
						"cursor-pointer hover:opacity-80 transition-opacity duration-200",
						className,
					)}
				>
					<AvatarImage src={user?.image} />
					<AvatarFallback>{user?.name?.slice(0, 2).toUpperCase() ?? "??"}</AvatarFallback>
				</Avatar>
			</DropdownMenuTrigger>
			<DropdownMenuContent side={side as any}>
				<DropdownMenuLabel>{user?.name}</DropdownMenuLabel>
				<Link href={session?.user.id === user?.id ? "/profile/me" : `/users/${user?.id}`}>
					<DropdownMenuItem>
						<UserIcon size={16} className="mr-2" />
						Profile
					</DropdownMenuItem>
				</Link>
				{session?.user.id === user?.id && (
					<DropdownMenuItem onClick={() => signOut()} className="text-destructive">
						<LogOut size={16} className="mr-2" />
						Log Out
					</DropdownMenuItem>
				)}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
