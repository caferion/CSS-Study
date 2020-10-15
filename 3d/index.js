import './style.css';

const El = class {
  constructor() {
    this.el = document.createElement('div');
  }
  set class(v) {
    this.el.className = v;
  }
};

const Face = class extends El {
  constructor(w, h, x, y, z, rx, ry, rz, tx, ty) {
    super();
    this.el.style.cssText = `
      position:absolute;
      width:${w}px;
      height:${h}px;
      margin:-${h * 0.5}px 0 0 -${w * 0.5}px;
      transform:translate3d(${x}px, ${y}px, ${z}px) rotateX(${rx}rad) rotateY(${ry}rad) rotateZ(${rz}rad);
      background-position: -${tx}px ${ty}px;
      backface-visibility: hidden;
    `;
  }
};

const Mesh = class extends El {
  constructor(l, t) {
    super();
    this.el.style.cssText = `
      position:absolute;
      left:${l};top:${t};
      transform-style:preserve-3d;`;
  }
  add(face) {
    this.el.appendChild(face.el);
    return face;
  }
};

const mesh = new Mesh('50%', '50%');
const r = 100,
  height = 196,
  sides = 20;
const sideAngle = (Math.PI / sides) * 2;
const sideLen = r * Math.tan(Math.PI / sides);

for (let c = 0; c < sides; c++) {
  const x = (Math.sin(sideAngle * c) * r) / 2;
  const z = (Math.cos(sideAngle * c) * r) / 2;
  const ry = Math.atan2(x, z);
  const face = new Face(sideLen + 1, height, x, 0, z, 0, ry, 0, sideLen * c, 0);
  face.class = 'drum';
  mesh.add(face);
}
const top = new Face(100, 100, 0, -98, 0, Math.PI / 2, 0, 0, 0, 100);
const bottom = new Face(100, 100, 0, 98, 0, -Math.PI / 2, 0, 0, 0, 100);
top.class = 'drum';
bottom.class = 'drum';
mesh.add(top);
mesh.add(bottom);
mesh.class = 'ani';
document.body.appendChild(mesh.el);
