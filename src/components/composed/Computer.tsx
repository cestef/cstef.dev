import { useGLTF } from "@react-three/drei";
import React from "react";
import * as THREE from "three";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
	nodes: {
		Object_4: THREE.Mesh;
		Object_5: THREE.Mesh;
		Object_7: THREE.Mesh;
		Object_9: THREE.Mesh;
	};
	materials: {
		["Computer.Chassis"]: THREE.MeshStandardMaterial;
		["Computer.Black"]: THREE.MeshStandardMaterial;
		Monkey: THREE.MeshStandardMaterial;
		["Computer.Monitor.Glass"]: THREE.MeshStandardMaterial;
	};
};

export function Model(props: JSX.IntrinsicElements["group"] & { children?: React.ReactNode }) {
	const { nodes, materials } = useGLTF("/computer-transformed.glb") as GLTFResult;
	return (
		<group {...props} dispose={null}>
			<group>
				<mesh
					geometry={nodes.Object_4.geometry}
					material={materials["Computer.Chassis"]}
					scale={[1, 1.45, 1]}
				/>
				<mesh
					geometry={nodes.Object_5.geometry}
					material={materials["Computer.Black"]}
					scale={[1, 1.45, 1]}
				/>
				<mesh
					geometry={nodes.Object_7.geometry}
					material={materials.Monkey}
					position={[-0.735, -0.73, 1.462]}
					scale={[0.047, 0.047, 0.006]}
				/>
				<mesh
					geometry={nodes.Object_9.geometry}
					material={materials["Computer.Monitor.Glass"]}
					position={[0, 0.437, 1.255]}
					scale={[0.97, 0.97, 0.096]}
				>
					{/* <Html className="w-[110px] h-[50px]" position={[0, 0, 1]} transform occlude>
						{props.children}
					</Html> */}
				</mesh>
			</group>
		</group>
	);
}

useGLTF.preload("/computer-transformed.glb");
