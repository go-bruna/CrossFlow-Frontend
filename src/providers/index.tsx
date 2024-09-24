import ContextsProviders from "@/contexts";
import type { IContextChildrenProps } from "@/types/context";
import React from "react";

const Providers: React.FC<IContextChildrenProps> = ({
	children,
}): JSX.Element => {
	return (
		<React.StrictMode>
			<ContextsProviders>{children}</ContextsProviders>
		</React.StrictMode>
	);
};

export default Providers;
