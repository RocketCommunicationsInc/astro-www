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


### Low Earth Orbit (LEO)
LEO ranges from 160 to 2,000 km above Earth's surface. LEO satellites complete an orbit in about 90 minutes and are commonly used for Earth observation, telecommunications, and the International Space Station.
### Geostationary Orbit (GEO)
Geostationary orbit is at 35,786 km above Earth's equator. Satellites in GEO match Earth's rotation, appearing fixed in the sky. This makes them perfect for telecommunications and weather monitoring with continuous coverage of specific regions.
### Middle Earth Orbit (MEO)
Medium Earth Orbit exists between 2,000 and 36,000 km above Earth's surface, between LEO and GEO. These orbits are ideal for navigation systems like GPS, GLONASS, and Galileo, with orbital periods of 2-12 hours.
### High Earth Orbit (HEO)
HEO satellites are positioned at a higher altitude than GEO, providing global coverage. They provide extended coverage of high latitudes, with satellites spending most of their time over a specific region. Used for communications in northern regions poorly served by geostationary satellites.
### Sun-Synchronous Orbit (SSO)
SSO satellites are near-polar orbits that pass over any given point on Earth's surface at the same local solar time. This consistent lighting makes them excellent for Earth imaging, weather forecasting, and spy satellites.
### Polar Orbit
Polar orbits pass over Earth's poles with an inclination near 90°. These satellites eventually cover the entire planet as Earth rotates beneath them, making them ideal for Earth observation, climate monitoring, and reconnaissance.

## Maneuvering

Maneuvering involves changing the satellite's orbit to achieve a desired position or velocity. This can be done using thrusters or by adjusting the satellite's attitude. Maneuvers are necessary for maintaining the satellite's position, correcting for errors, and ensuring the satellite's mission objectives are met. Maneuvers can be classified into two types: orbital maneuvers and attitude maneuvers. Orbital maneuvers involve changing the satellite's altitude or inclination, while attitude maneuvers involve changing the satellite's orientation in space. Both types of maneuvers require careful planning and execution to ensure the satellite's safety and mission success.

### Station Keeping

Station keeping refers to the actions taken to keep a satellite in its designated position or orbit, typically using thrusters or attitude adjustments. It ensures the satellite remains within its assigned area, compensating for natural drift and other disturbances to meet mission objectives.

### Orbital Maneuvers

Orbital maneuvers are changes made to a satellite’s path, such as adjusting its altitude or inclination. These are usually performed with thrusters and are essential for correcting trajectory, avoiding collisions, or reaching new operational orbits.

### Inclination Change

An inclination change specifically alters the tilt of a satellite’s orbit relative to Earth’s equator. This maneuver, which requires significant energy, is used to modify coverage areas or adapt to mission requirements.



## Attitude Controls

Attitude control is the process of maintaining a satellite's orientation in space. It is crucial for ensuring the satellite's instruments and systems operate correctly and for maintaining the satellite's position relative to Earth. Attitude control is achieved through the use of thrusters, reaction wheels, and magnetorquers, among other methods.

### Euler Angles

Euler angles are a set of three angles used to describe the orientation of a rigid body in three-dimensional space. They are commonly used in satellite attitude control to represent the rotation of the satellite's body frame relative to an inertial reference frame. The three angles are typically denoted as roll, pitch, and yaw, and they describe rotations about the x, y, and z axes, respectively.

### Roll

Roll is the rotation about the x-axis, which is perpendicular to the satellite's body frame. It is used to adjust the satellite's orientation in the plane of its orbit.

### Pitch

Pitch is the rotation about the y-axis, which is perpendicular to the satellite's body frame. It is used to adjust the satellite's orientation in the plane of its orbit.

### Yaw

Yaw is the rotation about the z-axis, which is perpendicular to the satellite's body frame. It is used to adjust the satellite's orientation in the plane of its orbit.

## Attitude Control Subsystems

### Reaction Wheels

Reaction wheels are devices that spin rapidly and are used to control the attitude of a satellite. They work by applying a torque to the satellite, which causes it to rotate. Reaction wheels are typically used in conjunction with thrusters to provide precise attitude control.

### Magnetorquers

Magnetorquers are devices that use the Earth’s magnetic fields to control the attitude of a satellite. They work by applying a torque to the satellite, which causes it to rotate. Magnetorquers are typically used in conjunction with reaction wheels to provide precise attitude control.

### Start Trackers

Star Trackers use the position of the stars to determine the satellite's orientation in space. They work by measuring the positions of known stars and comparing them to a pre-stored catalog of star positions. This information is then used to calculate the satellite's attitude and position relative to Earth.

### Gyroscopes

Gyroscopes are devices that measure the angular velocity of a satellite. They work by spinning a rotor at a high speed and measuring the Coriolis force that is generated when the rotor is rotated. This information is then used to calculate the satellite's attitude and position relative to Earth.

### Sun Sensors

Sun sensors are devices that measure the angle between the satellite's body frame and the Sun. They work by detecting the intensity of sunlight and comparing it to a pre-stored calibration curve. This information is then used to calculate the satellite's attitude and position relative to Earth.

## Additional Components and Subsystems

### Power Subsystems

Power subsystems are responsible for generating and distributing electrical power to the satellite's various components. They typically consist of solar panels, batteries, and power distribution units.

### Thermal Control Subsystems

Thermal control subsystems are responsible for maintaining the satellite's temperature within a safe range. They typically consist of radiators, heaters, and thermal blankets.

### Communications Subsystems

Communications subsystems are responsible for transmitting and receiving data between the satellite and ground stations. They typically consist of antennas, modems, and signal processing units.

### Propulsion Subsystems

Propulsion subsystems are responsible for providing the necessary thrust to move the satellite through space. They typically consist of thrusters, propellant tanks, and attitude control systems.

### On-Board Computer (OBC)

On-Board Computer (OBC) is responsible for managing the satellite's operations and executing commands received from ground stations. It typically consists of a microprocessor, memory, and input/output interfaces.

### Guidance, Navigation, and Control (GNC) Subsystems

Guidance, Navigation, and Control (GNC) subsystems are responsible for maintaining the satellite's attitude and position relative to Earth. They typically consist of sensors, actuators, and control algorithms.

### Telemetry, Tracking and Command (TT&C) Subsystems

Telemetry, Tracking and Command (TT&C) subsystems are responsible for transmitting and receiving data between the satellite and ground stations. They typically consist of antennas, modems, and signal processing units.

### Payload

Payload subsystems are responsible for carrying and processing scientific or commercial data. They typically consist of sensors, data processing units, cameras, and communication interfaces.

### Radiation Hardening

Radiation hardening is responsible for protecting the satellite's electronics from the effects of radiation in space. It typically consists of radiation-hardened components, shielding, and error correction algorithms.

## Health Monitoring

Health monitoring is responsible for monitoring the satellite's health and status.

### Telemetry Data

Telemetry data is responsible for transmitting and receiving data between the satellite and ground stations. It typically consists of information about the satellites’s health including temperature, power levels, system status, and payload data. Telemetry data is continuously transmitted to ground stations.

### Ground Stations

Earthbound facilities that receive telemetry data and send commands to the satellite. They are equipped with antennas, receivers, and data processing units.

### Automated Health Checks

Software routines that continuously monitor the satellite's health and alert operators to any issues. These checks can include threshold monitoring, trend analysis, and anomaly detection.

### Redundancy

The inclusion of backup systems to ensure continued operation in case of a primary system failure. This can include redundant power supplies, communication links, and control systems.

## Command and Control (C2)

Command and control (C2) subsystems are responsible for receiving and executing commands from ground stations. They typically consist of command receivers, data processing units, and control interfaces.

### Uplink

Uplink is responsible for transmitting commands and data from ground stations to the satellite. It typically consists of antennas, transmitters, and data processing units.

### Downlink

Downlink is responsible for receiving data and commands from the satellite to ground stations. It typically consists of antennas, receivers, and data processing units.

### Command Sequences

Command sequences are responsible for organizing and executing commands in a specific order. They typically consist of command queues, scheduling algorithms, and error correction algorithms.

### Real-Time Operations

Real-time operations are responsible for executing commands in real-time. They typically consist of command receivers, data processing units, and control interfaces.

### Store-and-Forward

Store-and-forward is responsible for storing and forwarding data and commands between ground stations and the satellite. It typically consists of data storage units, communication links, and error correction algorithms.

### Payload Operations

Payload operations are responsible for managing the satellite's payload, including data acquisition, processing, and transmission. They typically consist of payload control units, data processing units, and communication links.

### Payload Operation

### Imaging Payloads

Imaging payloads are responsible for acquiring and processing images of the Earth's surface. They typically consist of cameras, image processing units, and communication links.

### Communication Payloads

Communication payloads are responsible for transmitting and receiving data and commands between ground stations and the satellite. They typically consist of antennas, transmitters, and receivers.

### Scientific Payloads

Scientific payloads are responsible for acquiring and processing scientific data from the Earth's surface. They typically consist of sensors, data processing units, and communication links.

### Real-Time Operations

Real-time operations are responsible for executing commands in real-time. They typically consist of command receivers, data processing units, and control interfaces.


## Communication

Communication payloads are responsible for transmitting and receiving data and commands between ground stations and the satellite. They typically consist of antennas, transmitters, and receivers.

### Radio Frequencies (RF)

Radio frequencies are responsible for transmitting and receiving data and commands between ground stations and the satellite. They typically consist of antennas, transmitters, and receivers.

### Bandwidth

Bandwidth is responsible for transmitting and receiving data and commands between ground stations and the satellite. They typically consist of antennas, transmitters, and receivers.

### Signal Modulation

Signal modulation is responsible for transmitting and receiving data and commands between ground stations and the satellite. They typically consist of antennas, transmitters, and receivers.

### Data Encryption

Data encryption is responsible for transmitting and receiving data and commands between ground stations and the satellite. They typically consist of antennas, transmitters, and receivers.

### Ground Network

Ground networks are responsible for transmitting and receiving data and commands between ground stations and the satellite. They typically consist of antennas, transmitters, and receivers.


## Anomoly Resolution

Anomoly resolution is responsible for transmitting and receiving data and commands between ground stations and the satellite. They typically consist of antennas, transmitters, and receivers.

### Anomaly Detection

The process of identifying deviations from normal operation using telemetry data. This can include automated detection algorithms and manual analysis by operators.

### Root Cause Analysis

Investigating the underlying cause of an anomaly. This involves analyzing telemetry data, reviewing command sequences, and consulting with experts.

### Corrective Actions

Steps taken to resolve the anomaly and restore normal operation. This can include resetting systems, reconfiguring software, and performing hardware diagnostics.

### Contingency Planning

Preparing for potential anomalies by developing response plans and training operators. This ensures a quick and effective response to unexpected issues.

## Ground Segment

Mission Control Center (MCC): The facility responsible for overall satellite operations. The MCC coordinates all activities, including command and control, health monitoring, and anomaly resolution.

### Ground Stations

Facilities that communicate with the satellite. They are equipped with large antennas, communication equipment, and data processing systems.

### Data Processing Centers

Facilities that process and analyze data received from the satellite. These centers convert raw telemetry and payload data into useful information for end-users

## Launch and Deployment

### Launch Vehicle

The launch vehicle is responsible for delivering the satellite into orbit. It consists of a rocket engine, fuel tanks, and other components necessary for launch.

### Deployment Sequence

The deployment sequence is the process by which the satellite is released from the launch vehicle and begins its journey into orbit. This typically involves deploying solar panels, antennas, and other components.

### Launch Window

The launch window is the time period during which the satellite can be launched. This is determined by factors such as weather conditions, orbital mechanics, and mission requirements.

## End-of-Life Operations

The end-of-life operations are the process by which the satellite is decommissioned and its resources are reclaimed. This typically involves de-orbiting the satellite and disposing of its components in a safe and environmentally responsible manner.

### Deorbiting

The process of bringing the satellite back into the Earth's atmosphere to burn up. This is done to reduce space debris and minimize the risk of collision with other satellites.

### Graveyard Orbit

A higher orbit where defunct satellites are moved to reduce the risk of collision. This is commonly used for geostationary satellites.

### Passivation

The process of deactivating a satellite's systems to prevent accidental reactivation or explosion. This includes venting remaining fuel and discharging batteries.

## Common Satellite Operations Applications

### Mission Planning

Mission planning involves the detailed scheduling and coordination of satellite operations to achieve mission objectives.

#### Mission Objectives
The specific goals and tasks that the satellite is designed to accomplish.

#### Operational Constraints
Limitations and requirements that must be considered during planning, such as power availability, communication windows, and orbital dynamics.

#### Task Scheduling
The process of allocating time slots for various satellite activities, including payload operations, maneuvers, and data transmission.

#### Resource Allocation
Ensuring that the satellite's resources, such as power and data storage, are used efficiently to meet mission objectives.

### Telemetry Tracking & Control (TT&C)

TT&C involves the continuous monitoring and control of the satellite through telemetry data, tracking its position, and sending commands.


#### Telemetry
The collection and transmission of data from the satellite to ground stations, providing information on the satellite's health and status.

#### Tracking
Determining the satellite's position and trajectory using ground-based radar and other tracking systems.

#### Command
Sending instructions from the ground station to the satellite to control its operations and perform specific tasks.

#### Ground Segment Integration
The coordination of TT&C activities with other ground segment components, such as mission control and data processing centers.

### Flight dynamics

Flight dynamics involves the analysis and control of the satellite's trajectory and orientation to ensure it remains on its intended path and performs its mission effectively.

#### Orbit Determination
Calculating the satellite's current orbit using tracking data and mathematical models.

#### Maneuver Planning

Designing and executing maneuvers to adjust the satellite's orbit or orientation, such as station-keeping, orbit raising, and inclination changes.


#### Attitude Control

Maintaining the correct orientation of the satellite using reaction wheels, magnetorquers, and other control devices.

#### Collision Avoidance

Monitoring the satellite's environment for potential collisions with other objects and planning maneuvers to avoid them.

### Ground Resource management

Ground resource management involves the efficient use of ground-based infrastructure and resources to support satellite operations.

#### Ground Stations
Managing the network of ground stations that communicate with the satellite, ensuring they are available and properly configured for scheduled contacts.

#### Data Processing
Coordinating the processing and analysis of data received from the satellite, including telemetry and payload data.

#### Network Management
Ensuring the ground communication network is reliable and capable of handling the data flow between the satellite and ground stations.

#### Maintenance and Upgrades
Regularly maintaining and upgrading ground-based equipment to ensure optimal performance and support for satellite operations.
