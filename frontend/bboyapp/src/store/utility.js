// update object properties

export const updateObject = (oldObject, updatedProperties) => {
	return {
		// creates clone of old objects
		...oldObject, 
		// takes object and replaces it, updates with these new keys
		...updatedProperties
	}
}