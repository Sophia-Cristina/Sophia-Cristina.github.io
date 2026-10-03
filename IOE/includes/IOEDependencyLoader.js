export async function IOE_LoadDependencies(dependencies)
{
    const LoadedDependencies = {};

    for(const Dependency of dependencies)
    {
        const Module = await import(Dependency.url);
        if(!Module[Dependency.name]) { throw new Error('IOE: Dependency "' + Dependency.name + '" was not found in module "' + Dependency.url + '".'); }
        LoadedDependencies[Dependency.name] = Module[Dependency.name];
    }
    return(LoadedDependencies);
}