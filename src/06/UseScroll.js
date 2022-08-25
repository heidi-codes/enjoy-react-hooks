import { useState, useEffect, useCallback } from "react";
import faker from "faker";

const getPosition = () => {
  return {
    x: document.body.scrollLeft,
    y: document.body.scrollTop
  };
};
const useScroll = () => {
  const [position, setPosition] = useState(getPosition());
  useEffect(() => {
    const handler = () => {
      setPosition(getPosition(document));
    };
    document.addEventListener("scroll", handler);
    return () => {
      document.removeEventListener("scroll", handler);
    };
  }, []);
  return position;
};

function ScrollTop() {
  const { y } = useScroll();

  const goTop = useCallback(() => {
    document.body.scrollTop = 0;
  }, []);

  const style = {
    position: "fixed",
    right: "10px",
    bottom: "10px"
  };
  if (y > 300) {
    return (
      <button onClick={goTop} style={style}>
        Back to Top
      </button>
    );
  }
  return null;
}

const data = [];
for (let i = 0; i < 20; i++) {
  data.push({
    id: i,
    name: faker.name.findName(),
    introduction: faker.lorem.paragraph()
  });
}
export default () => {
  return (
    <div>
      <h1>Use Scroll Sample</h1>
      {data.map((item) => (
        <div key={item.id}>
          <h2>{item.name}</h2>
          <p>{item.introduction}</p>
        </div>
      ))}
      <ScrollTop />
    </div>
  );
};
