export function IOE_GenerateInputs(Application, Element)
{
  if(!Application.header.inputs) { return; }

  for(const Input of Application.header.inputs)
  {
    const Label = document.createElement('label');
    Label.textContent = Input.name + ': ';
    const InputElement = document.createElement('input');
    InputElement.id = 'IOE_Input_' + Input.name;
    InputElement.type = Input.type;
    Label.appendChild(InputElement);
    Element.appendChild(Label);
    Element.appendChild(document.createElement('br'));
  }
}