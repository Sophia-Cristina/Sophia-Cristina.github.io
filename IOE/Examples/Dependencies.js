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
        ]
    },

    run: function(a, b, gamma, dependencies)
    {
        const Triangle = new dependencies.ysxTRI_Triangle(a, b, gamma);
        return(Triangle.CoutInfo());
    }
};