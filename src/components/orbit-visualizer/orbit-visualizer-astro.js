/**
 * OrbitVisualizer Web Component (Astro-compatible version)
 * A custom element that visualizes different types of orbits around Earth
 */
class OrbitVisualizerAstro extends HTMLElement {
  // Define orbit information data
  static orbitInfo = {
    leo: {
      title: "Low Earth Orbit (LEO)",
      description:
        "Low Earth Orbit ranges from 160 to 2,000 km above Earth's surface. LEO satellites complete an orbit in about 90 minutes and are commonly used for Earth observation, telecommunications, and the International Space Station.",
    },
    meo: {
      title: "Medium Earth Orbit (MEO)",
      description:
        "Medium Earth Orbit exists between 2,000 and 36,000 km above Earth's surface. These orbits are ideal for navigation systems like GPS, GLONASS, and Galileo, with orbital periods of 2-12 hours.",
    },
    geo: {
      title: "Geostationary Orbit (GEO)",
      description:
        "Geostationary orbit is at 35,786 km above Earth's equator. Satellites in GEO match Earth's rotation, appearing fixed in the sky. This makes them perfect for telecommunications and weather monitoring with continuous coverage of specific regions.",
    },
    polar: {
      title: "Polar Orbit",
      description:
        "Polar orbits pass over Earth's poles with an inclination near 90°. These satellites eventually cover the entire planet as Earth rotates beneath them, making them ideal for Earth observation, climate monitoring, and reconnaissance.",
    },
    sunSync: {
      title: "Sun-Synchronous Orbit",
      description:
        "Sun-synchronous orbits are near-polar orbits that pass over any given point on Earth's surface at the same local solar time. This consistent lighting makes them excellent for Earth imaging, weather forecasting, and spy satellites.",
    },
    heo: {
      title: "Highly Elliptical Orbit (HEO)",
      description:
        "HEO is a type of Highly Elliptical Orbit with 63.4° inclination and 12-hour periods. They provide extended coverage of high latitudes, with satellites spending most of their time over a specific region. Used for communications in northern regions poorly served by geostationary satellites.",
    },
    transfer: {
      title: "Hohmann Transfer Orbit",
      description:
        "Hohmann transfer orbits are elliptical orbits used to transfer between two circular orbits. This orbit minimizes the energy needed to move from one orbit to another, making it fuel-efficient but time-consuming for space travel.",
    },
  };

  // Default orbit parameters
  static defaultOrbitParams = {
    leo: { semiMajorAxis: 4, eccentricity: 0, inclination: 0 },
    meo: { semiMajorAxis: 7, eccentricity: 0, inclination: 0 },
    geo: { semiMajorAxis: 10, eccentricity: 0, inclination: 0 },
    polar: { semiMajorAxis: 5, eccentricity: 0, inclination: 90 },
    sunSync: { semiMajorAxis: 6, eccentricity: 0, inclination: 98 },
    heo: { semiMajorAxis: 12, eccentricity: 0.7, inclination: 63.4 },
    transfer: { semiMajorAxis: 15, eccentricity: 0.5, inclination: 0 },
  };

  constructor() {
    super();

    // Create DOM structure programmatically instead of using innerHTML
    this.createDomStructure();

    // Rendering properties
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.controls = null;
    this.clock = null;

    // Scene objects
    this.orbitObjects = {};
    this.satellites = {};
    this.earth = null;

    // Current state
    this.currentOrbitType = "leo";
    this.animationEnabled = true;

    // Bind methods to this instance
    this.animate = this.animate.bind(this);
    this.handleWindowResize = this.handleWindowResize.bind(this);
  }

  createDomStructure() {
    // Add styles
    const style = document.createElement('style');
    style.textContent = `
      /* Orbit Visualizer Component Styling */
      orbit-visualizer-astro {
        display: block;
        width: 100%;
        height: 100%;
        position: relative;
        overflow: hidden;
        min-height: 400px;
      }

      /* Make sure content is properly contained */
      orbit-visualizer-astro > * {
        width: 100%;
        height: 100%;
        position: relative;
      }

      .orbit-container {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #000;
      }

      .canvas-container {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        overflow: hidden;
      }

      /* Controls Panel */
      .controls {
        position: absolute;
        top: 10px;
        right: 10px;
        background: rgba(20, 20, 30, 0.9);
        border: 1px solid rgba(100, 100, 150, 0.6);
        border-radius: 5px;
        padding: 15px;
        color: #fff;
        z-index: 1000;
        max-width: 300px;
        backdrop-filter: blur(5px);
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.5);
        pointer-events: auto;
      }

      .control-group {
        margin-bottom: 15px;
      }

      .control-group h3 {
        margin: 0 0 10px 0;
        font-size: 16px;
        border-bottom: 1px solid rgba(100, 100, 150, 0.4);
        padding-bottom: 5px;
      }

      .control-item {
        margin-bottom: 8px;
      }

      /* Custom Colored Checkboxes */
      .checkbox-label {
        display: flex;
        align-items: center;
        cursor: pointer;
        margin-bottom: 8px;
        padding: 4px;
        border-radius: 4px;
        transition: background-color 0.2s;
      }

      .checkbox-label:hover {
        background-color: rgba(255, 255, 255, 0.1);
      }

      .checkbox-input {
        appearance: none;
        -webkit-appearance: none;
        width: 18px;
        height: 18px;
        border: 2px solid #fff;
        border-radius: 3px;
        margin-right: 8px;
        position: relative;
        cursor: pointer;
        background-color: transparent;
      }

      .checkbox-input:checked {
        background-color: #fff;
      }

      /* Define colors for each orbit type */
      #show-leo + span {
        color: #4285f4;
      }

      #show-meo + span {
        color: #34a853;
      }

      #show-geo + span {
        color: #fbbc05;
      }

      #show-polar + span {
        color: #ea4335;
      }

      #show-sunSync + span {
        color: #9c27b0;
      }

      #show-heo + span {
        color: #ff5722;
      }

      /* Checkbox background colors when checked */
      #show-leo:checked {
        background-color: #4285f4;
      }

      #show-meo:checked {
        background-color: #34a853;
      }

      #show-geo:checked {
        background-color: #fbbc05;
      }

      #show-polar:checked {
        background-color: #ea4335;
      }

      #show-sunSync:checked {
        background-color: #9c27b0;
      }

      #show-heo:checked {
        background-color: #ff5722;
      }

      .checkbox-input:checked::after {
        content: "";
        position: absolute;
        top: 2px;
        left: 6px;
        width: 4px;
        height: 8px;
        border: solid #000;
        border-width: 0 2px 2px 0;
        transform: rotate(45deg);
      }

      select, button, input[type="range"] {
        width: 100%;
        margin-bottom: 5px;
        background: rgba(30, 30, 40, 0.7);
        color: #fff;
        border: 1px solid rgba(100, 100, 150, 0.4);
        border-radius: 3px;
        padding: 5px;
      }

      select:hover, button:hover {
        background: rgba(60, 60, 100, 0.7);
      }

      /* Range Slider Styling */
      input[type="range"] {
        -webkit-appearance: none;
        height: 8px;
        border-radius: 4px;
        background: rgba(80, 80, 110, 0.3);
        outline: none;
      }

      input[type="range"]::-webkit-slider-thumb {
        -webkit-appearance: none;
        width: 16px;
        height: 16px;
        border-radius: 50%;
        background: rgba(100, 130, 255, 0.8);
        cursor: pointer;
      }

      input[type="range"]::-moz-range-thumb {
        width: 16px;
        height: 16px;
        border-radius: 50%;
        background: rgba(100, 130, 255, 0.8);
        cursor: pointer;
      }

      /* Media queries for smaller screens */
      @media (max-width: 768px) {
        .controls {
          max-width: 250px;
          font-size: 0.9rem;
          padding: 10px;
        }

        .control-group h3 {
          font-size: 14px;
        }
      }
    `;
    this.appendChild(style);
    
    // Create orbit container
    const orbitContainer = document.createElement('div');
    orbitContainer.className = 'orbit-container';
    
    // Create canvas container
    const canvasContainer = document.createElement('div');
    canvasContainer.className = 'canvas-container';
    canvasContainer.id = 'canvas-container';
    orbitContainer.appendChild(canvasContainer);
    
    // Create controls
    const controls = document.createElement('div');
    controls.className = 'controls';
    
    // Orbit types control group
    const orbitTypesGroup = document.createElement('div');
    orbitTypesGroup.className = 'control-group';
    
    const orbitTypesHeading = document.createElement('h3');
    orbitTypesHeading.textContent = 'Orbit Types';
    orbitTypesGroup.appendChild(orbitTypesHeading);
    
    // Add orbit type checkboxes
    this.addOrbitTypeCheckbox(orbitTypesGroup, 'leo', 'Low Earth Orbit (LEO)', true);
    this.addOrbitTypeCheckbox(orbitTypesGroup, 'meo', 'Medium Earth Orbit (MEO)', false);
    this.addOrbitTypeCheckbox(orbitTypesGroup, 'geo', 'Geostationary Orbit (GEO)', false);
    this.addOrbitTypeCheckbox(orbitTypesGroup, 'polar', 'Polar Orbit', false);
    this.addOrbitTypeCheckbox(orbitTypesGroup, 'sunSync', 'Sun-Synchronous Orbit', false);
    this.addOrbitTypeCheckbox(orbitTypesGroup, 'heo', 'Highly Elliptical Orbit (HEO)', false);
    
    controls.appendChild(orbitTypesGroup);
    
    // View controls group
    const viewControlsGroup = document.createElement('div');
    viewControlsGroup.className = 'control-group';
    
    const viewControlsHeading = document.createElement('h3');
    viewControlsHeading.textContent = 'View Controls';
    viewControlsGroup.appendChild(viewControlsHeading);
    
    // Reset view button
    const resetViewButton = document.createElement('button');
    resetViewButton.id = 'reset-view';
    resetViewButton.textContent = 'Reset View';
    viewControlsGroup.appendChild(resetViewButton);
    
    // Animation checkbox
    const animationControlItem = document.createElement('div');
    animationControlItem.className = 'control-item';
    
    const animationLabel = document.createElement('label');
    animationLabel.className = 'checkbox-label';
    
    const animationCheckbox = document.createElement('input');
    animationCheckbox.type = 'checkbox';
    animationCheckbox.className = 'checkbox-input';
    animationCheckbox.id = 'show-animation';
    animationCheckbox.checked = true;
    
    const animationSpan = document.createElement('span');
    animationSpan.textContent = 'Show Animation';
    
    animationLabel.appendChild(animationCheckbox);
    animationLabel.appendChild(animationSpan);
    animationControlItem.appendChild(animationLabel);
    viewControlsGroup.appendChild(animationControlItem);
    
    controls.appendChild(viewControlsGroup);
    orbitContainer.appendChild(controls);
    
    // Add orbit container to component
    this.appendChild(orbitContainer);
  }
  
  addOrbitTypeCheckbox(parent, id, label, checked) {
    const controlItem = document.createElement('div');
    controlItem.className = 'control-item';
    
    const checkboxLabel = document.createElement('label');
    checkboxLabel.className = 'checkbox-label';
    
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'checkbox-input';
    checkbox.id = `show-${id}`;
    checkbox.checked = checked;
    
    const span = document.createElement('span');
    span.textContent = label;
    
    checkboxLabel.appendChild(checkbox);
    checkboxLabel.appendChild(span);
    controlItem.appendChild(checkboxLabel);
    parent.appendChild(controlItem);
  }

  connectedCallback() {
    this.init();
    this.setupEventListeners();
  }

  disconnectedCallback() {
    window.removeEventListener("resize", this.handleWindowResize);
    // Remove all event listeners
    const controls = this.querySelectorAll("button, input, select");
    controls.forEach((element) => {
      element.replaceWith(element.cloneNode(true));
    });

    // Stop animation
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }

    // Dispose Three.js resources
    if (this.renderer) {
      this.renderer.dispose();
    }
  }

  init() {
    // Get the container element
    const container = this.querySelector("#canvas-container");

    // Make sure THREE.js is loaded
    if (typeof THREE === 'undefined') {
      console.error('THREE.js not loaded. Cannot initialize orbit visualizer.');
      return;
    }

    // Create Three.js scene
    this.scene = new THREE.Scene();

    // Set up camera
    this.camera = new THREE.PerspectiveCamera(
      75,
      container.clientWidth / container.clientHeight,
      0.1,
      1000,
    );
    this.camera.position.set(0, 25, 0); // Position above the north pole

    // Set up renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(container.clientWidth, container.clientHeight);
    this.renderer.setClearColor(0x000000);
    container.appendChild(this.renderer.domElement);

    // Set up orbit controls
    this.controls = new THREE.OrbitControls(
      this.camera,
      this.renderer.domElement,
    );
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;
    this.controls.minDistance = 5;
    this.controls.maxDistance = 50;

    // Add lights
    this.addLights();

    // Create Earth and orbits
    this.createEarth();
    this.createAllOrbits();

    // Set up animation clock
    this.clock = new THREE.Clock();

    // Start animation loop
    this.animate();

    // Set initial sizes
    this.updateRendererSize();
  }

  addLights() {
    // Ambient light for base illumination
    const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
    this.scene.add(ambientLight);

    // Directional light for shadows
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 3, 5);
    this.scene.add(directionalLight);

    // Point light at center for radial illumination
    const pointLight = new THREE.PointLight(0xffffff, 0.5);
    pointLight.position.set(0, 0, 0);
    this.scene.add(pointLight);
  }

  animate() {
    this.animationFrameId = requestAnimationFrame(this.animate);

    // Update controls
    this.controls.update();

    // Update satellite positions if animation is enabled
    if (this.animationEnabled) {
      this.updateSatellitePositions(this.clock.getElapsedTime());
    }

    // Render scene
    this.renderer.render(this.scene, this.camera);
  }

  updateRendererSize() {
    const container = this.querySelector("#canvas-container");
    const width = container.clientWidth;
    const height = container.clientHeight;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  handleWindowResize() {
    this.updateRendererSize();
  }

  createEarth() {
    // Create Earth
    const radius = 3;
    const geometry = new THREE.SphereGeometry(radius, 64, 64);
    const material = new THREE.MeshPhongMaterial({
      color: 0x2233ff,
      shininess: 25,
    });

    this.earth = new THREE.Mesh(geometry, material);
    this.scene.add(this.earth);
  }

  createAllOrbits() {
    // For each orbit type
    Object.entries(OrbitVisualizerAstro.defaultOrbitParams).forEach(
      ([key, params]) => {
        // Determine color based on orbit type
        const color = new THREE.Color(
          key === "leo"
            ? 0x4285f4
            : key === "meo"
              ? 0x34a853
              : key === "geo"
                ? 0xfbbc05
                : key === "polar"
                  ? 0xea4335
                  : key === "sunSync"
                    ? 0x9c27b0
                    : key === "heo"
                      ? 0xff5722
                      : 0xffffff,
        );

        // Create orbit line and satellite
        const orbitLine = this.createOrbit(
          params.semiMajorAxis,
          params.eccentricity,
          params.inclination,
          color,
        );
        const satellite = this.createSatellite(0.2, color, key.toUpperCase());

        // Add to collections
        this.orbitObjects[key] = orbitLine;
        this.satellites[key] = satellite;

        // Add to scene
        this.scene.add(orbitLine, satellite);

        // Set initial visibility (only LEO is visible by default)
        if (key !== "leo") {
          orbitLine.visible = false;
          satellite.visible = false;
        }
      },
    );

    // Update orbit visibility from checkbox states
    this.updateOrbitVisibility();
  }

  createOrbit(semiMajorAxis, eccentricity, inclination, color) {
    // Number of points in the orbit
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

  createSatellite(radius, color, label) {
    // Create satellite group
    const satelliteGroup = new THREE.Group();

    // Skip satellite mesh creation and only create label

    // If label is provided, add text label
    if (label) {
      // Use canvas to create texture with text
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      canvas.width = 128;
      canvas.height = 64;

      // Draw background matching orbit color
      context.fillStyle = "#" + color.getHexString();
      context.fillRect(0, 0, canvas.width, canvas.height);

      // Add a darker border
      context.strokeStyle = "rgba(0,0,0,0.5)";
      context.lineWidth = 4;
      context.strokeRect(2, 2, canvas.width - 4, canvas.height - 4);

      // Draw text
      context.font = "bold 28px Arial";
      context.fillStyle = "white";
      context.textAlign = "center";
      context.textBaseline = "middle";
      context.fillText(label, canvas.width / 2, canvas.height / 2);

      // Create sprite with canvas texture
      const texture = new THREE.CanvasTexture(canvas);
      const spriteMaterial = new THREE.SpriteMaterial({
        map: texture,
        transparent: true,
        depthTest: true,
      });

      const sprite = new THREE.Sprite(spriteMaterial);
      sprite.scale.set(2, 1, 1);
      // Position the label at the center of where satellite would be
      sprite.position.set(0, 0, 0);
      satelliteGroup.add(sprite);
    }

    return satelliteGroup;
  }

  updateSatellitePositions(time) {
    // Update position of each satellite along its orbit
    Object.entries(this.satellites).forEach(([key, satelliteGroup]) => {
      if (!satelliteGroup || !satelliteGroup.visible) return;

      // Get orbit parameters
      const params = OrbitVisualizerAstro.defaultOrbitParams[key];
      if (!params) return;

      // Calculate orbit position based on time using Kepler's Third Law
      // Speed is proportional to 1/sqrt(a³)
      const semiMajorAxis = params.semiMajorAxis;
      const speed = 1 / Math.sqrt(Math.pow(semiMajorAxis, 3));
      const angle = (time * speed * 2) % (Math.PI * 2); // Scale factor for better visualization

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
          satelliteGroup.children[i].quaternion.copy(this.camera.quaternion);
          
          // Calculate the distance to the camera to determine if this label is behind Earth
          const labelPos = new THREE.Vector3(x, newY, newZ);
          const earthToLabel = labelPos.clone();
          const earthToCameraDir = this.camera.position.clone().normalize();
          
          // If the label is on the opposite side of Earth from the camera
          const dotProduct = earthToLabel.normalize().dot(earthToCameraDir);
          
          // Check if label is behind Earth from camera's perspective
          if (dotProduct < 0 && labelPos.length() < 3) { // 3 is Earth radius
            // Hide the sprite when behind Earth
            satelliteGroup.children[i].visible = false;
          } else {
            satelliteGroup.children[i].visible = true;
          }
        }
      }
    });
  }

  updateOrbitVisibility() {
    ["leo", "meo", "geo", "polar", "sunSync", "heo", "transfer"].forEach(
      (key) => {
        const checkbox = this.querySelector(`#show-${key}`);
        const visible = checkbox ? checkbox.checked : false;

        if (this.orbitObjects[key]) {
          this.orbitObjects[key].visible = visible;
          this.satellites[key].visible = visible;
        }
      },
    );
  }

  setupEventListeners() {
    // Window resize event
    window.addEventListener("resize", this.handleWindowResize);

    // Orbit visibility checkboxes
    ["leo", "meo", "geo", "polar", "sunSync", "heo"].forEach((key) => {
      const checkbox = this.querySelector(`#show-${key}`);
      if (checkbox) {
        checkbox.addEventListener("change", () => {
          this.updateOrbitVisibility();
          if (checkbox.checked) {
            this.currentOrbitType = key;
          }
        });

        // Add click event to update orbit type
        checkbox.addEventListener("click", () => {
          if (checkbox.checked) {
            // Update current orbit type
            this.currentOrbitType = key;
          }
        });
      }
    });

    // Animation toggle
    const animationCheckbox = this.querySelector("#show-animation");
    if (animationCheckbox) {
      animationCheckbox.addEventListener("change", () => {
        this.animationEnabled = animationCheckbox.checked;
      });
    }

    // Reset view button
    const resetButton = this.querySelector("#reset-view");
    if (resetButton) {
      resetButton.addEventListener("click", () => {
        this.resetView();
      });
    }
  }

  resetView() {
    // Reset camera position to top-down view from north pole
    this.camera.position.set(0, 25, 0);
    this.camera.lookAt(0, 0, 0);

    // Reset controls
    this.controls.reset();
  }
}

// Define the custom element
customElements.define("orbit-visualizer-astro", OrbitVisualizerAstro);