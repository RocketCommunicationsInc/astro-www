---
layout: project:layouts/docs/docs-layout.astro
title: Satellite Operations 101
description: Understanding the basics of satellite operations
---

Welcome to Satellite Operations 101! This guide aims to provide you with a foundational understanding of the fundamental elements involved in satellite operations. Whether you're a designer, developer, or product owner, this document will equip you with the foundational knowledge of satellite functionality and management.

## Orbits

Satellites orbit the Earth in various paths, each with its own characteristics. Understanding these orbits is crucial for effective satellite operations.

<div class="orbit-container">
  <div id="orbit-visualizer-container" class="orbit-wrapper"></div>
  <div id="orbit-controls" class="orbit-controls">
    <div class="control-group">
      <h4>Orbit Types</h4>
      <div class="control-items">
        <label class="checkbox-label">
          <input type="checkbox" id="show-leo" class="orbit-checkbox" checked>
          <span class="leo-color">Low Earth Orbit (LEO)</span>
        </label>
        <label class="checkbox-label">
          <input type="checkbox" id="show-meo" class="orbit-checkbox">
          <span class="meo-color">Medium Earth Orbit (MEO)</span>
        </label>
        <label class="checkbox-label">
          <input type="checkbox" id="show-geo" class="orbit-checkbox">
          <span class="geo-color">Geostationary Orbit (GEO)</span>
        </label>
        <label class="checkbox-label">
          <input type="checkbox" id="show-polar" class="orbit-checkbox">
          <span class="polar-color">Polar Orbit</span>
        </label>
        <label class="checkbox-label">
          <input type="checkbox" id="show-sso" class="orbit-checkbox">
          <span class="sunsync-color">Sun-Synchronous Orbit (SSO)</span>
        </label>
        <label class="checkbox-label">
          <input type="checkbox" id="show-heo" class="orbit-checkbox">
          <span class="heo-color">Highly Elliptical Orbit (HEO)</span>
        </label>
      </div>
    </div>
    <div class="control-group">
      <h4>View Controls</h4>
      <button id="reset-view" class="orbit-button">Reset View</button>
      <label class="checkbox-label">
        <input type="checkbox" id="show-animation" checked>
        <span>Show Animation</span>
      </label>
    </div>
  </div>
</div>

<style>
.orbit-container {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}

.orbit-wrapper {
  position: relative;
  width: 100%;
  height: 400px;
  background-color: #0a0a1a;
  border-radius: 8px 8px 0 0;
  overflow: hidden;
}

.orbit-controls {
  background-color: #1a1a2a;
  padding: 10px;
  border-radius: 0 0 8px 8px;
  color: #fff;
}

.control-group {
  margin-bottom: 15px;
}

.control-group h4 {
  margin: 0 0 8px 0;
  font-size: 16px;
  border-bottom: 1px solid rgba(100, 100, 150, 0.4);
  padding-bottom: 5px;
}

.control-items {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 16px;
}

.checkbox-label {
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.checkbox-label:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.orbit-checkbox {
  margin-right: 5px;
}

.leo-color { color: #4285f4; }
.meo-color { color: #34a853; }
.geo-color { color: #fbbc05; }
.polar-color { color: #ea4335; }
.sunsync-color { color: #9c27b0; }
.heo-color { color: #ff5722; }

.orbit-button {
  background: rgba(30, 30, 40, 0.7);
  color: #fff;
  border: 1px solid rgba(100, 100, 150, 0.4);
  border-radius: 3px;
  padding: 5px 10px;
  margin-right: 10px;
  cursor: pointer;
}

.orbit-button:hover {
  background: rgba(60, 60, 100, 0.7);
}

@media (max-width: 768px) {
  .control-items {
    flex-direction: column;
    gap: 4px;
  }
}
</style>

<script is:inline src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
<script is:inline src="https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/controls/OrbitControls.min.js"></script>
<script is:inline>
// Wait for window to load to ensure THREE is available
window.addEventListener('load', function() {
  if (typeof THREE === 'undefined') {
    console.error('THREE.js not loaded');
    return;
  }

  initOrbitVisualizer();
});

function initOrbitVisualizer() {
  // Define orbit parameters
  const orbitParams = {
    leo: { semiMajorAxis: 4, eccentricity: 0, inclination: 0 },
    meo: { semiMajorAxis: 7, eccentricity: 0, inclination: 0 },
    geo: { semiMajorAxis: 10, eccentricity: 0, inclination: 0 },
    polar: { semiMajorAxis: 5, eccentricity: 0, inclination: 90 },
    sso: { semiMajorAxis: 6, eccentricity: 0, inclination: 98 },
    heo: { semiMajorAxis: 12, eccentricity: 0.7, inclination: 63.4 }
  };

  // Get the container
  const container = document.getElementById('orbit-visualizer-container');
  if (!container) {
    console.error('Container not found');
    return;
  }

  // Create scene
  const scene = new THREE.Scene();

  // Create camera
  const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
  camera.position.set(0, 15, 0); // Decreased distance for a closer view

  // Create renderer
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setClearColor(0x000000);
  container.appendChild(renderer.domElement);

  // Set up orbit controls
  const controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.minDistance = 5;
  controls.maxDistance = 50;

  // Add lights
  const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(5, 3, 5);
  scene.add(directionalLight);

  // Create Earth
  const radius = 3;
  const earthGeometry = new THREE.SphereGeometry(radius, 32, 32);
  const earthMaterial = new THREE.MeshPhongMaterial({
    color: 0x2233ff,
    shininess: 25
  });
  const earth = new THREE.Mesh(earthGeometry, earthMaterial);
  scene.add(earth);

  // Create collections for orbit objects
  const orbitObjects = {};
  const satellites = {};
  let animationEnabled = true;

  // Create all orbits
  createAllOrbits();

  // Animation
  const clock = new THREE.Clock();
  function animate() {
    requestAnimationFrame(animate);
    controls.update();

    // Update satellites if animation is enabled
    if (animationEnabled) {
      updateSatellitePositions(clock.getElapsedTime());
    }

    renderer.render(scene, camera);
  }
  animate();

  // Handle window resize
  window.addEventListener('resize', function() {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  });

  // Set up UI event listeners
  setupEventListeners();

  // Function to create all orbits
  function createAllOrbits() {
    // For each orbit type
    Object.entries(orbitParams).forEach(([key, params]) => {
      // Determine color based on orbit type
      const color = new THREE.Color(
        key === 'leo'
          ? 0x4285f4
          : key === 'meo'
            ? 0x34a853
            : key === 'geo'
              ? 0xfbbc05
              : key === 'polar'
                ? 0xea4335
                : key === 'sso'
                  ? 0x9c27b0
                  : key === 'heo'
                    ? 0xff5722
                    : 0xffffff,
      );

      // Create orbit line and satellite
      const orbitLine = createOrbit(
        params.semiMajorAxis,
        params.eccentricity,
        params.inclination,
        color,
      );
      const satellite = createSatellite(0.2, color, key.toUpperCase());

      // Add to collections
      orbitObjects[key] = orbitLine;
      satellites[key] = satellite;

      // Add to scene
      scene.add(orbitLine, satellite);

      // Set initial visibility (only LEO is visible by default)
      if (key !== 'leo') {
        orbitLine.visible = false;
        satellite.visible = false;
      }
    });

    // Update orbit visibility based on checkboxes
    updateOrbitVisibility();
  }

  // Function to create orbit
  function createOrbit(semiMajorAxis, eccentricity, inclination, color) {
    const points = 100;
    const orbitPoints = [];

    // For perfectly circular orbits, ensure eccentricity is exactly zero
    if (eccentricity < 0.001) eccentricity = 0;

    // Create elliptical orbit path
    for (let i = 0; i <= points; i++) {
      const angle = (i / points) * Math.PI * 2;

      // Calculate position on ellipse
      let distance;
      if (eccentricity === 0) {
        // Perfect circle when eccentricity is zero
        distance = semiMajorAxis;
      } else {
        // Elliptical orbit formula
        distance =
          (semiMajorAxis * (1 - eccentricity * eccentricity)) /
          (1 + eccentricity * Math.cos(angle));
      }

      // Calculate position without inclination
      let x = distance * Math.cos(angle);
      let y = 0;
      let z = distance * Math.sin(angle);

      // Apply inclination (rotation around x-axis)
      const incRad = (inclination * Math.PI) / 180;
      const newY = y * Math.cos(incRad) - z * Math.sin(incRad);
      const newZ = y * Math.sin(incRad) + z * Math.cos(incRad);

      // Add point to orbit
      orbitPoints.push(new THREE.Vector3(x, newY, newZ));
    }

    // Create orbit line
    const orbitGeometry = new THREE.BufferGeometry().setFromPoints(orbitPoints);
    const orbitMaterial = new THREE.LineBasicMaterial({ color: color });
    return new THREE.Line(orbitGeometry, orbitMaterial);
  }

  // Function to create satellite with label
  function createSatellite(radius, color, label) {
    // Create satellite group
    const satelliteGroup = new THREE.Group();

    // If label is provided, add text label
    if (label) {
      // Use canvas to create texture with text
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      canvas.width = 128;
      canvas.height = 64;

      // Draw background matching orbit color
      context.fillStyle = '#' + color.getHexString();
      context.fillRect(0, 0, canvas.width, canvas.height);

      // Add a darker border
      context.strokeStyle = 'rgba(0,0,0,0.5)';
      context.lineWidth = 4;
      context.strokeRect(2, 2, canvas.width - 4, canvas.height - 4);

      // Draw text
      context.font = 'bold 28px Arial';
      context.fillStyle = 'white';
      context.textAlign = 'center';
      context.textBaseline = 'middle';
      context.fillText(label, canvas.width / 2, canvas.height / 2);

      // Create sprite with canvas texture
      const texture = new THREE.CanvasTexture(canvas);
      const spriteMaterial = new THREE.SpriteMaterial({
        map: texture,
        transparent: true,
        depthTest: true
      });

      const sprite = new THREE.Sprite(spriteMaterial);
      sprite.scale.set(2, 1, 1);
      // Position the label at the center of where satellite would be
      sprite.position.set(0, 0, 0);
      satelliteGroup.add(sprite);
    }

    return satelliteGroup;
  }

  // Update satellite positions based on time
  function updateSatellitePositions(time) {
    // Update position of each satellite along its orbit
    Object.entries(satellites).forEach(([key, satelliteGroup]) => {
      if (!satelliteGroup || !satelliteGroup.visible) return;

      // Get orbit parameters
      const params = orbitParams[key];
      if (!params) return;

      // Calculate orbit position based on time using Kepler's Third Law
      // Speed is proportional to 1/sqrt(a³)
      const semiMajorAxis = params.semiMajorAxis;
      const speed = 1 / Math.sqrt(Math.pow(semiMajorAxis, 3));
      const angle = (time * speed * 2) % (Math.PI * 2);

      // Calculate position on ellipse
      let eccentricity = params.eccentricity;

      // For perfectly circular orbits, ensure eccentricity is exactly zero
      if (eccentricity < 0.001) eccentricity = 0;

      // Calculate distance from focus
      let distance;
      if (eccentricity === 0) {
        // Perfect circle when eccentricity is zero
        distance = semiMajorAxis;
      } else {
        // Elliptical orbit formula
        distance =
          (semiMajorAxis * (1 - eccentricity * eccentricity)) /
          (1 + eccentricity * Math.cos(angle));
      }

      // Calculate position without inclination
      let x = distance * Math.cos(angle);
      let y = 0;
      let z = distance * Math.sin(angle);

      // Apply inclination (rotation around x-axis)
      const incRad = (params.inclination * Math.PI) / 180;
      const newY = y * Math.cos(incRad) - z * Math.sin(incRad);
      const newZ = y * Math.sin(incRad) + z * Math.cos(incRad);

      // Update satellite position
      satelliteGroup.position.set(x, newY, newZ);

      // Ensure label is always facing the camera
      for (let i = 0; i < satelliteGroup.children.length; i++) {
        if (satelliteGroup.children[i] instanceof THREE.Sprite) {
          // Make sprite always face the camera
          satelliteGroup.children[i].quaternion.copy(camera.quaternion);

          // Calculate the distance to the camera to determine if this label is behind Earth
          const labelPos = new THREE.Vector3(x, newY, newZ);
          const earthToLabel = labelPos.clone();
          const earthToCameraDir = camera.position.clone().normalize();

          // If the label is on the opposite side of Earth from the camera
          const dotProduct = earthToLabel.normalize().dot(earthToCameraDir);

          // Check if label is behind Earth from camera's perspective
          if (dotProduct < 0 && labelPos.length() < 3) {
            // Hide the sprite when behind Earth
            satelliteGroup.children[i].visible = false;
          } else {
            satelliteGroup.children[i].visible = true;
          }
        }
      }
    });
  }

  // Update orbit visibility based on checkboxes
  function updateOrbitVisibility() {
    ['leo', 'meo', 'geo', 'polar', 'sso', 'heo'].forEach(
      (key) => {
        const checkbox = document.getElementById(`show-${key}`);
        const visible = checkbox ? checkbox.checked : false;

        if (orbitObjects[key]) {
          orbitObjects[key].visible = visible;
          satellites[key].visible = visible;
        }
      }
    );
  }

  // Set up event listeners for UI controls
  function setupEventListeners() {
    // Orbit visibility checkboxes
    ['leo', 'meo', 'geo', 'polar', 'sso', 'heo'].forEach((key) => {
      const checkbox = document.getElementById(`show-${key}`);
      if (checkbox) {
        checkbox.addEventListener('change', updateOrbitVisibility);
      }
    });

    // Animation toggle
    const animationCheckbox = document.getElementById('show-animation');
    if (animationCheckbox) {
      animationCheckbox.addEventListener('change', () => {
        animationEnabled = animationCheckbox.checked;
      });
    }

    // Reset view button
    const resetButton = document.getElementById('reset-view');
    if (resetButton) {
      resetButton.addEventListener('click', () => {
        // Reset camera position to top-down view from north pole
        camera.position.set(0, 15, 0);
        camera.lookAt(0, 0, 0);
        // Reset controls
        controls.reset();
      });
    }
  }
}
</script>



# Satellite Mission Lifecycle Overview

This document traces a satellite’s journey from concept through retirement, blending narrative flow with detailed definitions of key orbits, subsystems, and control concepts.

## Mission Definition & Design

Before launch, mission goals drive every technical choice:

- **Mission Objectives**: Specify coverage (global vs. regional), revisit frequency, data latency, and payload function (e.g., imaging resolution, communications bandwidth, scientific sensing).

- **Orbit Selection**: Choose an orbit to meet objectives:
  - **Low Earth Orbit (LEO)**: 160–2,000 km altitude, ~90 min orbital period, low-latency Earth observation or telecom.
  - **Medium Earth Orbit (MEO)**: 2,000–35,786 km, 2–12 hr periods (navigation constellations use ~12 hr), balanced coverage and revisit time.
  - **Geostationary Orbit (GEO)**: 35,786 km equatorial, 24 hr period, appears fixed for continuous broadcast and weather monitoring.
  - **High Earth Orbit (HEO)**: Highly elliptical (e.g., Molniya, ~12 hr period, ~40,000 km apogee) for prolonged high-latitude coverage.
  - **Sun-Synchronous Orbit (SSO)**: Near-polar, precessing to maintain constant local solar time, ideal for consistent illumination in imaging.
  - **Polar Orbit**: ~90° inclination, passes over poles each revolution, full Earth coverage as the planet rotates.

- **Payload & Subsystem Requirements**: Derive sensor specifications, data throughput, power and thermal budgets, and pointing accuracy.

- **GNC (Guidance, Navigation & Control) Specs**: Define attitude precision (arcsecond-level for high-resolution imaging) and orbit-keeping Δv budgets.

> _Transition_: With design locked in, we turn to getting the satellite on its way.

---

## Launch & Deployment

Key steps ensure the satellite reaches its intended orbit and becomes operational:

1. **Launch Vehicle & Window**
   - Select rocket family and upper stage based on payload mass and target orbit.
   - Determine launch window from orbital mechanics and weather constraints.

2. **Separation & Initial Acquisition**
   - After stage separation, deploy solar arrays and stabilize attitude.
   - Acquire initial **TT&C** (Telemetry, Tracking & Command) link for health checks.

3. **Orbit Insertion Maneuvers**
   - Execute burns to circularize or phase into the operational orbit (e.g., apogee/perigee adjustments).

> _Transition_: Once in place, maintaining path and pointing becomes the daily task.

---

## On-Orbit Operations

### Flight Dynamics (Path Control)
- **Station Keeping**: Small thruster burns or reaction wheel momentum dumps counteract perturbations (atmospheric drag, gravitational anomalies, solar pressure).
- **Orbital Maneuvers**: Burns to raise/lower orbit, change inclination (Δv-intensive to adjust orbital plane), or perform phasing for constellation deployment.
- **Collision Avoidance**: Use conjunction analysis to plan avoidance maneuvers when close approaches are detected.

### Attitude Control (Pointing)
- **Euler Angles**: Roll (rotation about x-axis), pitch (y-axis), yaw (z-axis) define spacecraft orientation.
- **Reaction Wheels**: Flywheels exchange angular momentum for fine pointing.
- **Magnetorquers**: Coils generate torque via Earth’s magnetic field for coarse maneuvers or dumping excess wheel momentum.
- **Star Trackers**: Cameras match observed star fields to onboard catalogs, providing high-precision attitude knowledge.
- **Gyroscopes**: Measure angular velocity to support control loops and bridge star tracker updates.
- **Sun Sensors**: Photodiodes detect sun angle; used for safe modes and sun-pointing tasks.

### Core Subsystems
- **Power Subsystem**: Solar arrays harvest energy; batteries store and discharge via Power Distribution Units (PDUs).
- **Thermal Control**: Radiators, heaters, and Multi-Layer Insulation (MLI) regulate component temperatures.
- **Communications Subsystem**:
  - **RF Bands & Antennas**: Uplink/downlink frequencies and high-gain vs. omni antennas.
  - **Modulation Schemes**: PSK/QPSK for data encoding.
  - **Encryption**: Ensures secure telemetry and payload data.
- **Propulsion Subsystem**: Thrusters (chemical or electric) and propellant management for orbit control and deorbit.
- **On-Board Computer (OBC)** & **GNC**: Flight software executes control algorithms, processes sensor data, and commands actuators.
- **Radiation Hardening**: Shielding, radiation-tolerant parts, and error-correcting codes protect electronics.

### Ground Segment & Command
- **Mission Control Center (MCC)**: Orchestrates planning, real-time monitoring, and anomaly response.
- **Ground Stations**: Distributed antennas support scheduled contacts for TT&C.
- **Data Processing Centers**: Transform raw telemetry and payload streams into calibrated products.

### Health Monitoring & Anomaly Management
- **Telemetry Streams**: Continuous data on temperatures, voltages, currents, and payload metrics.
- **Automated Health Checks**: Onboard and ground-based algorithms raise alerts on parameter excursions or trends.
- **Redundancy Strategies**: Cross-strapped components and failover logic maintain operations if primaries fail.
- **Anomaly Resolution Workflow**: Detect → Diagnose (root-cause analysis) → Corrective Action (reset, reconfiguration) → Contingency Plan activation.

> _Transition_: Finally, when the mission concludes, end-of-life planning protects space environments.

---

## End-of-Life Operations

- **Deorbiting**: Use propulsive burns to lower perigee for controlled reentry and burn-up in the atmosphere.
- **Graveyard Orbit**: For GEO assets, relocate above GEO (~300 km higher) to reduce collision risk.
- **Passivation**: Vent remaining propellant, discharge batteries, and ground-sensitive electronics to prevent post-mission explosions.

---
