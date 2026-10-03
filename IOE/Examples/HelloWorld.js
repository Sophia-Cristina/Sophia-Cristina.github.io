export const IOE_Application =
{
    header:
    {
        name: 'Hello World',
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
        ]
    },

    run: function(a, b) { return('Hello World! a + b = ' + (a + b)); }
};