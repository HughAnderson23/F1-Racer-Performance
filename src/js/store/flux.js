const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			drivers: [],
		},
		actions: {
			fetchDrivers: async (year) => {
				try {
					const resp = await fetch(`https://ergast.com/api/f1/${year}/drivers.json`);
					if (!resp.ok) {
						throw new Error('Failed to fetch data');
					}
					const data = await resp.json();
					// Assuming the driver list is nested under 'drivers' in the response
					const drivers = data.MRData.DriverTable.Drivers;
					setStore({ drivers });
				} catch (error) {
					console.error('Error fetching drivers:', error);
				}
			},
		},
	};
};

export default getState;

