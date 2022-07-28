import { useState } from "react";

export default function Accordion(props) {
  const [clicked, setClicked] = useState(false);

  const list = ["tag1", "tag2", "tag3", "tag4", "tag5"];

  return (
    <>
      <div
        className="accordion-button"
        onClick={() => {
          setClicked(!clicked);
        }}
      >
        {props.name}
      </div>
      {clicked ? (
        <div className="">
           
          <ul>
            {list.map((i) => {
              return (
                <li style={{display:"flex"}} key={i}>
                  <div>
                    <input type="checkbox" />
                  </div>
                  <div style={{paddingLeft:"1rem"}}>
                    <label>
                        <h4>{i}</h4>
                        
                    </label>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}
    </>
  );
}
