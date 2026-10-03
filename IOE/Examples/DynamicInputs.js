export const IOE_Application =
{
  header:
  {
      name: 'Triangle Calculator',
      version: '0.1',
      interface:
      {
          required:
          [
              'text'
          ]
      },
      dependencies:
      [
          {
              name: 'ysxTRI_Triangle',
              url: '/JSHeaders/ysxMath/Geo/ysxTri.js'
          }
      ],
      inputs:
      [
          { name: 'a', type: 'number' },
          { name: 'b', type: 'number' },
          { name: 'gamma', type: 'number' }
      ]
  },

  run: function(IOE)
  {
      const a = IOE.input.number('a');
      const b = IOE.input.number('b');
      const gamma = IOE.input.number('gamma');
      const Triangle = new IOE.dependencies.ysxTRI_Triangle(a, b, gamma);
      return(Triangle.CoutInfo());
  }
};