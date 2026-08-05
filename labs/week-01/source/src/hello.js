const student = {
  name: "ธดากรณ์ เชื้อโต่ง",
  studentId: "ุ68543210052-5",
  os: process.platform,
  node: process.version,
};

function createGreeting({ name, studentId, os, node }) {
  return `Hello ${name} (${studentId}) | OS: ${os} | Node: ${node}`;
}

console.log(createGreeting(student));