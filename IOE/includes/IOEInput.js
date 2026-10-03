export function IOE_CreateInputInterface()
{
  return(
    {
      number: function(name)
      {
          const Element = document.getElementById('IOE_Input_' + name);
          if(!Element) { throw new Error('IOE: Input "' + name + '" does not exist.'); }
          const Value = Number(Element.value);
          if(Number.isNaN(Value)) { throw new Error('IOE: Input "' + name + '" does not contain a valid number.'); }
          return(Value);
      },

      string: function(name)
      {
          const Element = document.getElementById('IOE_Input_' + name);
          if(!Element) { throw new Error('IOE: Input "' + name + '" does not exist.'); }
          return(Element.value);
      }
    }
  );
}