import * as THREE from "three";

import { Html, useGLTF } from "@react-three/drei";

import { useRef } from "react";

export default function Macbook(
	props: JSX.IntrinsicElements["group"] & { children?: React.ReactNode }
) {
	const group = useRef<THREE.Group>(null!);
	const { nodes, materials } = useGLTF(
		"macbook.glb"
		// rome-ignore lint/suspicious/noExplicitAny: <explanation>
	) as any;

	return (
		<group ref={group} {...props} dispose={null}>
			<group rotation-x={-0.425} position={[0, -0.04, 0.41]}>
				<group position={[0, 2.96, -0.13]} rotation={[Math.PI / 2, 0, 0]}>
					<mesh material={materials.aluminium} geometry={nodes["Cube008"].geometry} />
					<mesh
						material={materials["matte.001"]}
						geometry={nodes["Cube008_1"].geometry}
					/>
					<mesh geometry={nodes["Cube008_2"].geometry}>
						{/* Drei's HTML component can "hide behind" canvas geometry */}
						<Html
							className="content"
							rotation-x={-Math.PI / 2}
							position={[0, 0.05, -0.09]}
							transform
							occlude
						>
							{props.children}
						</Html>
					</mesh>
				</group>
			</group>
			<mesh
				material={materials.keys}
				geometry={nodes.keyboard.geometry}
				position={[1.79, 0, 3.45]}
			/>
			<group position={[0, -0.1, 3.39]}>
				<mesh material={materials.aluminium} geometry={nodes["Cube002"].geometry} />
				<mesh material={materials.trackpad} geometry={nodes["Cube002_1"].geometry} />
			</group>
			<mesh
				material={materials.touchbar}
				geometry={nodes.touchbar.geometry}
				position={[0, -0.03, 1.2]}
			/>
		</group>
	);
}

useGLTF.preload("/macbook.glb");
