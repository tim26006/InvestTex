import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OBJLoader } from 'three-stdlib';
// Import OrbitControls
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const ThreeDModelViewer = () => {
    const containerRef = useRef(null);
    let object3D = useRef(null);
    let controls = useRef(null);

    useEffect(() => {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000); // Adjusted aspect ratio (1:1) to fit modal
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(600, 600); // Adjusted size to fit modal (width: 600, height: 600)
        containerRef.current.appendChild(renderer.domElement);
        renderer.setClearColor(0xffffff);

        // Add lighting to the scene
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
        directionalLight.position.set(1, 1, 1).normalize();
        scene.add(directionalLight);

        // OBJ Loader
        const objLoader = new OBJLoader();
        objLoader.load(
            '/src/components/K_Building B_09.obj',
            (object) => {
                object3D.current = object;
                scene.add(object);

                // Scale down the object
                const box = new THREE.Box3().setFromObject(object);
                const size = box.getSize(new THREE.Vector3()).length();
                const scale = 300 / size; // Scale factor to fit within 300 units box (adjust as needed)
                object.scale.set(scale, scale, scale);

                // Center the object in the scene
                const center = box.getCenter(new THREE.Vector3());
                object.position.sub(center);

                // Adjust camera position to view the entire object
                const boundingBox = new THREE.Box3().setFromObject(object);
                const objectSize = boundingBox.getSize(new THREE.Vector3());
                const objectCenter = boundingBox.getCenter(new THREE.Vector3());

                const aspect = objectSize.x / objectSize.y;
                const fov = camera.fov * (Math.PI / 180);
                let distance = Math.abs(objectSize.y / 2 / Math.tan(fov / 2));
                const cameraZ = objectCenter.z + objectSize.z * 1.5; // Set camera above the object
                camera.position.set(objectCenter.x, objectCenter.y, cameraZ);
                camera.lookAt(objectCenter);

                // Add OrbitControls
                controls.current = new OrbitControls(camera, renderer.domElement);
                controls.current.enableDamping = true; // Optional: enable damping (smooth rotation effect)
                controls.current.dampingFactor = 0.25; // Optional: set damping factor
                controls.current.rotateSpeed = 0.35; // Optional: set rotate speed

                // Set initial target for OrbitControls
                controls.current.target.copy(objectCenter); // Set target to object center

            },
            (xhr) => {
                console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
            },
            (error) => {
                console.error('An error happened', error);
            }
        );

        const animate = function () {
            requestAnimationFrame(animate);
            renderer.render(scene, camera);
            // Update OrbitControls
            if (controls.current) {
                controls.current.update();
            }
        };

        animate();

        const handleResize = () => {
            const width = 600; // Adjusted width to fit modal
            const height = 600; // Adjusted height to fit modal
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
            renderer.setSize(width, height);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            renderer.dispose();
            scene.clear();
            // Dispose OrbitControls
            if (controls.current) {
                controls.current.dispose();
                delete controls.current;
            }
        };
    }, []);

    return (
        <div className="content-container" ref={containerRef} style={{ width: '600px', height: '600px', margin: '10px', position: 'relative' }}>
            {/* Additional content or styling can be added here */}
        </div>
    );
};

export default ThreeDModelViewer;
