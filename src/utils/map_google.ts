declare global {
    interface Window {
        google?: typeof google;
    }
}

export {};

// Definimos los tipos correctos para la respuesta de DirectionsService.route
export type DirectionsCallback = (
    result: google.maps.DirectionsResult | null,
    status: google.maps.DirectionsStatus
) => void;