'use client'

export default function Page(
    { params }: { params: {
            idUsuario: string,
            semestre: string,
            materia: string,
        } }
) {
    return (
        <>
            <div className={ "container" }>
                <p>USUARIO: {params.idUsuario}</p>
                <p>SEMESTRE: {params.semestre}</p>
                <p>MATERIA: {params.materia}</p>
            </div>
        </>
    )
}