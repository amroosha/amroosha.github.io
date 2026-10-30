import { useEffect, useRef } from 'react'
import * as THREE from 'three'

// Skill names from portfolio.ts
const ML_CV_SKILLS = [
  'PyTorch', 'TensorFlow', 'Scikit-learn', 'OpenCV',
  'YOLO', 'ONNX', 'U2-Net', 'Faster R-CNN', 'Wav2Vec2'
]

const ORBIT_CONFIGS = [
  { radius: 3, speed: 0.005, count: 3, color: 0x00d2ff }, // Inner orbit
  { radius: 5, speed: 0.003, count: 4, color: 0x3a7bd5 }, // Middle orbit
  { radius: 7, speed: 0.002, count: 2, color: 0x00f2fe }, // Outer orbit
]

export function SkillTreeAtomVisuals() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // 1. Scene Setup
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x0a0a0a)

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.z = 12
    camera.position.y = 2

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(window.devicePixelRatio)
    container.appendChild(renderer.domElement)

    // 2. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4)
    scene.add(ambientLight)

    const pointLight = new THREE.PointLight(0x00d2ff, 2, 50)
    pointLight.position.set(5, 5, 5)
    scene.add(pointLight)

    const glowLight = new THREE.PointLight(0xffffff, 1.5, 30)
    glowLight.position.set(0, 0, 0)
    scene.add(glowLight)

    // 3. Nucleus (ML & CV)
    const nucleusGeometry = new THREE.SphereGeometry(1.5, 64, 64)
    const nucleusMaterial = new THREE.MeshStandardMaterial({
      color: 0x00d2ff,
      emissive: 0x0077ff,
      emissiveIntensity: 0.5,
      roughness: 0.2,
      metalness: 0.8,
    })
    const nucleus = new THREE.Mesh(nucleusGeometry, nucleusMaterial)
    scene.add(nucleus)

    // Nucleus glow effect (simple sprite or additional mesh)
    const glowGeometry = new THREE.SphereGeometry(1.7, 32, 32)
    const glowMaterial = new THREE.MeshBasicMaterial({
      color: 0x00d2ff,
      transparent: true,
      opacity: 0.15,
      blending: THREE.AdditiveBlending,
    })
    const glow = new THREE.Mesh(glowGeometry, glowMaterial)
    scene.add(glow)

    // 4. Orbiting Atoms (Skills)
    const atoms: THREE.Mesh[] = []
    const orbitGroups: THREE.Group[] = []

    ORBIT_CONFIGS.forEach((config, orbitIndex) => {
      const group = new THREE.Group()
      scene.add(group)
      orbitGroups.push(group)

      for (let i = 0; i < config.count; i++) {
        const angle = (i / config.count) * Math.PI * 2
        const atomGeometry = new THREE.SphereGeometry(0.3, 32, 32)
        const atomMaterial = new THREE.MeshStandardMaterial({
          color: config.color,
          roughness: 0.3,
          metalness: 0.7,
        })
        const atom = new THREE.Mesh(atomGeometry, atomMaterial)

        // Position on orbit
        atom.position.x = Math.cos(angle) * config.radius
        atom.position.z = Math.sin(angle) * config.radius
        
        // Store orbit info for animation
        atom.userData = {
          orbitRadius: config.radius,
          orbitSpeed: config.speed,
          angle: angle,
          baseY: 0,
          skillName: ML_CV_SKILLS[orbitIndex * config.count + i] || 'Skill',
        }

        group.add(atom)
        atoms.push(atom)
      }
    })

    // 5. Wind Particles
    const windParticleCount = 150
    const windGeometry = new THREE.BufferGeometry()
    const windPositions = new Float32Array(windParticleCount * 3)
    const windVelocities = new Float32Array(windParticleCount * 3)

    for (let i = 0; i < windParticleCount; i++) {
      windPositions[i * 3] = (Math.random() - 0.5) * 20
      windPositions[i * 3 + 1] = (Math.random() - 0.5) * 15
      windPositions[i * 3 + 2] = (Math.random() - 0.5) * 20

      // Wind direction: generally from left-back to right-front
      windVelocities[i * 3] = 0.02 + Math.random() * 0.03
      windVelocities[i * 3 + 1] = (Math.random() - 0.5) * 0.01
      windVelocities[i * 3 + 2] = 0.01 + Math.random() * 0.02
    }

    windGeometry.setAttribute('position', new THREE.BufferAttribute(windPositions, 3))
    
    const windMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.08,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    })

    const windParticles = new THREE.Points(windGeometry, windMaterial)
    scene.add(windParticles)

    // 6. Animation Loop
    const clock = new THREE.Clock()
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener('resize', handleResize)

    let requestID = 0
    const animate = () => {
      requestID = requestAnimationFrame(animate)
      const time = clock.getElapsedTime()

      // Rotate nucleus
      nucleus.rotation.y += 0.005
      nucleus.rotation.x += 0.002
      glow.rotation.y -= 0.003

      // Animate orbits and wind interaction
      atoms.forEach((atom, index) => {
        const data = atom.userData
        data.angle += data.orbitSpeed
        
        // Orbital motion
        atom.position.x = Math.cos(data.angle) * data.orbitRadius
        atom.position.z = Math.sin(data.angle) * data.orbitRadius
        
        // Wind effect: subtle drifting (sinusoidal based on time and index)
        const windDriftX = Math.sin(time * 0.5 + index) * 0.15
        const windDriftY = Math.cos(time * 0.3 + index) * 0.1
        const windDriftZ = Math.sin(time * 0.4 + index) * 0.15
        
        atom.position.x += windDriftX
        atom.position.y = Math.sin(time * 0.8 + index) * 0.3 + windDriftY
        atom.position.z += windDriftZ

        // Subtle scaling (breathing)
        const scale = 1 + Math.sin(time * 2 + index) * 0.1
        atom.scale.set(scale, scale, scale)
      })

      // Animate wind particles
      const positions = windParticles.geometry.attributes.position.array
      for (let i = 0; i < windParticleCount; i++) {
        positions[i * 3] += windVelocities[i * 3]
        positions[i * 3 + 1] += windVelocities[i * 3 + 1]
        positions[i * 3 + 2] += windVelocities[i * 3 + 2]

        // Reset particles that go out of bounds
        if (positions[i * 3] > 15) positions[i * 3] = -15
        if (positions[i * 3 + 1] > 10) positions[i * 3 + 1] = -10
        if (positions[i * 3 + 2] > 15) positions[i * 3 + 2] = -15
      }
      windParticles.geometry.attributes.position.needsUpdate = true

      // Camera slight movement
      camera.position.x = Math.sin(time * 0.2) * 0.5
      camera.position.y = 2 + Math.cos(time * 0.3) * 0.3
      camera.lookAt(0, 0, 0)

      renderer.render(scene, camera)
    }

    animate()

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(requestID)
      renderer.dispose()
      container.removeChild(renderer.domElement)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="w-full h-[600px] md:h-[800px] relative overflow-hidden bg-black/50 rounded-xl"
      style={{ cursor: 'grab' }}
    >
      <div className="absolute top-4 left-4 z-10 pointer-events-none">
        <h3 className="text-xl font-bold text-white/90 font-mono tracking-wide">
          Machine Learning &amp; Computer Vision
        </h3>
        <p className="text-sm text-white/60 font-mono">
          Atomic Skill System • Wind Dynamics
        </p>
      </div>
      <div className="absolute bottom-4 right-4 z-10 pointer-events-none text-right">
        <div className="text-[10px] font-mono text-white/40 uppercase tracking-[0.2em]">
          Orbiting: {ML_CV_SKILLS.join(' · ')}
        </div>
      </div>
    </div>
  )
}
