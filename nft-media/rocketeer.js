const name = require( 'random-name' )
const { pickRandomArrayEntry, pickRandomAttributes, randomNumberBetween, globalAttributes, heavenlyBodies, web2domain, getColorName } = require( '../modules/helpers' )
const svgFromAttributes = require( './svg-generator' )

// ///////////////////////////////
// Rocketeer generator
// ///////////////////////////////
async function generateRocketeer( id, network='mainnet' ) {

    // The base object of a new Rocketeer
    const rocketeer = {
        name: `${ name.first() } ${ name.middle() } ${ name.last() } of ${ id % 42 == 0 ? 'the Towel' : pickRandomArrayEntry( heavenlyBodies ) }`,
        description: '',
        image: ``,
        external_url: `https://viewer.rocketeer.fans/?rocketeer=${ id }` + ( network == 'mainnet' ? '' : '&testnet=true' ),
        attributes: []
    }

    // Generate randomized attributes
    rocketeer.attributes = pickRandomAttributes( globalAttributes )

    // Set birthday
    rocketeer.attributes.push( {
      "display_type": "date", 
      "trait_type": "birthday", 
      "value": Math.floor( Date.now() / 1000 )
    } )

    // Special editions
    const edition = { "trait_type": "edition", value: "regular" }
    if( id <= 50 ) edition.value = 'genesis'
    if( id >= ( 3475 - 166 ) ) edition.value = 'straggler'
    if( id % 42 === 0 ) edition.value = 'hitchhiker'
    if( ( id - 1 ) % 42 == 0 ) edition.value = 'generous'
    rocketeer.attributes.push( edition )

    // Create description
    rocketeer.description = `${ rocketeer.name } is a proud member of the ${ rocketeer.attributes.find( ( { trait_type } ) => trait_type == 'patch' ).value } guild.`

    // Generate color attributes
    rocketeer.attributes.push( {
        "trait_type": "outfit color",
        value: `rgb( ${ randomNumberBetween( 0, 255 ) }, ${ randomNumberBetween( 0, 255 ) }, ${ randomNumberBetween( 0, 255 ) } )`
    } )
    rocketeer.attributes.push( {
        "trait_type": "outfit accent color",
        value: `rgb( ${ randomNumberBetween( 0, 255 ) }, ${ randomNumberBetween( 0, 255 ) }, ${ randomNumberBetween( 0, 255 ) } )`
    } )
    rocketeer.attributes.push( {
        "trait_type": "backpack color",
        value: `rgb( ${ randomNumberBetween( 0, 255 ) }, ${ randomNumberBetween( 0, 255 ) }, ${ randomNumberBetween( 0, 255 ) } )`
    } )
    rocketeer.attributes.push( {
        "trait_type": "visor color",
        value: `rgb( ${ randomNumberBetween( 0, 255 ) }, ${ randomNumberBetween( 0, 255 ) }, ${ randomNumberBetween( 0, 255 ) } )`
    } )

    // Generate, compile and upload image
    rocketeer.image = await svgFromAttributes( rocketeer.attributes, `${ network }Rocketeers/${id}` )

    // Namify the attributes
    rocketeer.attributes = rocketeer.attributes.map( attribute => {

        if( !attribute.trait_type.includes( 'color' ) ) return attribute
        return {
            ...attribute,
            value: getColorName( attribute.value )
        }

    } )

    return rocketeer;
}

module.exports = {
    web2domain,
    generateRocketeer
}