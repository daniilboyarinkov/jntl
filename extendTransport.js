class EarthRoute {
  static vault = [];
  transfer(parcel) {
    parcel.destination = "Earth";
    EarthRoute.vault.push(parcel);
  }
}

class MoonRoute {
  static warehouse = [];
  transfer(parcel) {
    parcel.destination = "Moon";
    MoonRoute.warehouse.push(parcel);
  }
}

// ----------------------------------------------------------------

function extendTransportSystem(EarthRoute, MoonRoute) {
  const result = [];

  const earthTransfer = EarthRoute.prototype.transfer;
  const moonTransfer = MoonRoute.prototype.transfer;
  const mothershipTransfer = (parcel) => {
    result.push({
      ...parcel,
      origin: parcel.destination,
      destination: "Mothership",
    });
  };

  EarthRoute.prototype.transfer = (parcel) => {
    earthTransfer(parcel);
    mothershipTransfer(parcel);
  };
  MoonRoute.prototype.transfer = (parcel) => {
    moonTransfer(parcel);
    mothershipTransfer(parcel);
  };

  return result;
}

// ----------------------------------------------------------------

const mothershipStorage = extendTransportSystem(EarthRoute, MoonRoute);

const earthRoute1 = new EarthRoute();
const moonRoute2 = new MoonRoute();

earthRoute1.transfer({ content: 123 });
moonRoute2.transfer({ text: "abc" });

console.log(mothershipStorage);
/* [
 *   { content: 123, origin: 'Earth', destination: 'Mothership' },
 *   { text: 'abc', origin: 'Moon', destination: 'Mothership' }
 * ]
 */

console.log(EarthRoute.vault);
/* [
 *   { content: 123, destination: 'Earth' }
 * ]
 */

console.log(MoonRoute.warehouse);
/* [
 *   { text: 'abc', destination: 'Moon' }
 * ]
 */
