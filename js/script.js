/* ===========================================

Author : Levan Mebonia
Username: Levo96

Project: Etch A Sketch

=============================================== */
window.onload = function(){

  // Variables
  const sketch_board = document.querySelector("#sketch_board");
  const standard_color = "rgb(0,0,0)";
  const non_color = "rgb(255,255,255)";

  /* ---- STANDARD Drawing Board ------ */
  sketch_board.style.display = "grid";


  //-- grid constructor function this lets you construct your grid
  let grid_constructor = (n=16) => {

    sketch_board.style.gridTemplateRows = "repeat(" + n + ", 1fr)";
    sketch_board.style.gridTemplateColumns = "repeat(" + n + ", 1fr)";

    for(let i = 0; i <(n*n); i++) {
      sketch_board.appendChild(document.createElement("div"));
    }
  }

  //this removes the squares in the grid
  let remover = () => {
    let elements_to_remove =  sketch_board.querySelectorAll("div");
    for(let i = 0; i < elements_to_remove.length; i++) {
      sketch_board.removeChild(elements_to_remove[i]);
    }
  }

  grid_constructor();
  //-- squares in the drawing_board

  // making the squares in the grid drawable
  let square_drawable = (string="black") => {
    let sketch_board_squares = sketch_board.querySelectorAll("div");
    /* -- this makes the drawing board white bofore making it drawable in the selected color
    for(let i = 0; i < sketch_board_squares.length; i++) {
      sketch_board_squares[i].style.backgroundColor = "white";
    } */
    for(let i = 0; i < sketch_board_squares.length; i++) {
      sketch_board_squares[i].addEventListener("mouseover", () => {
        sketch_board_squares[i].style.backgroundColor = string;
      });
    }
  }

  //this gives every square a random color every time you mouseover it
  let square_drawable_random = ()  => {
    let sketch_board_squares = sketch_board.querySelectorAll("div");
    for(let i = 0; i < sketch_board_squares.length; i++) {
      sketch_board_squares[i].addEventListener("mouseover", () => {
        let random_color_number_1 = Math.floor( (Math.random()*255)+1);
        let random_color_number_2 = Math.floor( (Math.random()*255)+1);
        let random_color_number_3 = Math.floor( (Math.random()*255)+1);
        let random_color = "rgb(" + random_color_number_1 + "," + random_color_number_2 + "," + random_color_number_3 + ")";
        sketch_board_squares[i].style.backgroundColor = random_color;
      });
    }
  }

  square_drawable();

  // ---------------------------------------------------------------
  /* -------------- SKETCH PAD -------------------- */
  //variables for the sketch pad
  const user_input_board = document.querySelector("#grid_size_input");
  let user_input = document.querySelector("#user_input_g_size");
  const okay_button = document.querySelector('#OK_button');
  const cancel_button = document.querySelector('#cancel_button');
  let ui_gs_value;

  const size_button = document.querySelector('#size_button');
  //this opens the grid selection pannel
  size_button.addEventListener("click", () => {
    user_input.value = "";
    user_input_board.style.visibility = "visible";
    sketch_board.style.opacity = "0";
  });
  //this checks if the input is a number
  okay_button.addEventListener("click", () => {

    ui_gs_value =  0;

    if(user_input.value == ""){
      user_input.value = "";
      alert("PLEASE TYPE A NUMBER FROM 1 -> 100");
    }
    else if(user_input.value != "") {
      ui_gs_value = parseInt(user_input.value);
    }
    else {
      alert("ERROR ! :( ");
    }

    if(isNaN(ui_gs_value)){
      ui_gs_value = 0;
      user_input.value = "";
      alert("NOT A NUMBER: TYPE A NUMBER FROM 1 -> 100 !");
    }
    else if(ui_gs_value <= 0 || ui_gs_value > 100) {
      ui_gs_value = 0;
      user_input.value = "";
      alert("TYPE A NUMBER FROM 1 -> 100 !");
    }
    else {
      console.log(ui_gs_value);
      remover();
      grid_constructor(ui_gs_value);
      square_drawable();
      user_input.value = "";
      sketch_board.style.opacity = "1";
      user_input_board.style.visibility = "hidden";
    }
  });
  // this cancels the choose grid process and let's you continue where you left of
  cancel_button.addEventListener("click", () => {
    user_input.value = "";
    sketch_board.style.opacity = "1";
    user_input_board.style.visibility = "hidden";
  });

  let reset_button = document.querySelector('#reset_button');

  //-- this resets the grid to the standard grid 16*16
  reset_button.addEventListener("click", () => {
    remover();
    grid_constructor();
    square_drawable();
  });

  let clear_button = document.querySelector('#clear_button');

  //this let's you clear the whole drawing board
  clear_button.addEventListener("click", () =>  {
    let sketch_board_squares = sketch_board.querySelectorAll("div");
    for(let i= 0; i < sketch_board_squares.length; i++ ) {
      sketch_board_squares[i].style.backgroundColor = "white";
    }
  });

  let eraser_button = document.querySelector('#eraser_button');

  //this let's you erase colored square
  eraser_button.addEventListener("click", () => {
    let sketch_board_squares = sketch_board.querySelectorAll("div");
    for(let i = 0; i < sketch_board_squares.length; i++) {
      sketch_board_squares[i].addEventListener("mouseover", () => {
        sketch_board_squares[i].style.backgroundColor = "white";
      });
    }
  });

  let colors_button = document.querySelector('#colors_button');
  let color_picker_board = document.querySelector('#color_picker_board');

  //this let's you open the color panel to choose a color
  colors_button.addEventListener("click", ()=> {
    color_picker_board.style.visibility = "visible";
  });

  let close_cpb_button = document.querySelector('#cpb_close_button');
  let color_divs = document.querySelectorAll('.colors_items');

  //this let's you close the colors-panel
  close_cpb_button.addEventListener("click", () => {
    color_picker_board.style.visibility = "hidden";
  });

  let colors_container = document.querySelector('#cc_colors');
  let cc_colors = document.querySelectorAll('.colors_items');

  //-- this function let's you choose choose the color and draw with it
  for(let i = 0; i < cc_colors.length; i++) {
    cc_colors[i].addEventListener("click", () => {
      //let backgroundColor I copied from the StackOverFlow.com because i did not know how to extract the backgroundColor from an element in javascript
      //let backgroundColor takes the backgroundColor value  from an elemnt
      let backgroundColor = window.getComputedStyle ? window.getComputedStyle(cc_colors[i], null).getPropertyValue("background-color") : cc_colors[i].style.backgroundColor
      square_drawable(backgroundColor);
    });
  }

  let rainbow_colors = document.querySelector('#rainbow_buttons');

  rainbow_colors.addEventListener("click", () => {
    square_drawable_random();
  });

  let random_color_button = document.querySelector('#cbpi_random_button');

  random_color_button.addEventListener("click", () => {
    let random_color_number_1 = Math.floor( (Math.random()*255)+1);
    let random_color_number_2 = Math.floor( (Math.random()*255)+1);
    let random_color_number_3 = Math.floor( (Math.random()*255)+1);
    let random_color = "rgb(" + random_color_number_1 + "," + random_color_number_2 + "," + random_color_number_3 + ")";
    square_drawable(random_color);
  });

  let shader_button = document.querySelector("#cbpi_shader_button");

// =====================| rgb-shader function|==============================

rgb_shader = (rgb_color) => {
  let color = rgb_color;
  const count = 5;
  let num_converter = 0;
  let string_converter = "";
  let new_color = "rgb(";

  let index_color_1 = color.indexOf("(") +1;
  let index_character_1 = color.indexOf(",");

  let first_piece_of_string = color.slice(index_color_1,index_character_1);

  num_converter = parseInt(first_piece_of_string);

  if(num_converter > 0 ) {
    num_converter -= count;
    string_converter = num_converter.toString();
    new_color +=  string_converter + ",";
  }else {
    string_converter = num_converter.toString();
    new_color +=  string_converter + ",";
  }


  // second color value
  let index_color_2 = color.indexOf(",") +1;

  let index_character_2 = color.lastIndexOf(",");

  let second_piece_of_string = color.slice(index_color_2, index_character_2);

  num_converter = parseInt(second_piece_of_string);

  if (num_converter > 0) {
    num_converter -= count;
    string_converter = num_converter.toString();
    new_color += string_converter + ",";
  } else {
    string_converter = num_converter.toString();
    new_color += string_converter + ",";
  }

  // third color value
  let index_color_3 = color.indexOf(")");

  let index_character_3 = color.lastIndexOf(",")+1;

  let third_piece_of_string = color.slice( index_character_3,index_color_3);


  num_converter = parseInt(third_piece_of_string);

  if(num_converter > 0) {
    num_converter -= count;
    string_converter = num_converter.toString();
    new_color += string_converter + ")";
  }else {
    string_converter = num_converter.toString();
    new_color += string_converter + ")";
  }

  return new_color;
}

// =================================================================
let darker_square_drawable = () => {
  let sketch_board_squares = sketch_board.querySelectorAll("div");
  for(let i = 0; i < sketch_board_squares.length; i++) {
    sketch_board_squares[i].addEventListener("mouseover", () => {
      let bckgrnd_color = sketch_board_squares[i].style.backgroundColor;
      let new_color = rgb_shader(bckgrnd_color);
      sketch_board_squares[i].style.backgroundColor = new_color;
    });
  }
}
//==================================================================
  shader_button.addEventListener("click", () => {
    darker_square_drawable();
});

}
