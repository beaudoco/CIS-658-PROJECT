export class APICallsService {

    async getProviders(rootRef) {
        var list = [];
        return rootRef.get().then((snapshot) => {
            snapshot.docs.forEach(doc => {
                list.push(doc.data());
            });
            return list;
        });
    }

    addShows(rootRef, showObj, printer) {
        rootRef.add(showObj).then(() => {
            printer(showObj.providerID);
        });
    }

    async getShows(rootRef) {
        var list = [];
        return rootRef.get().then((snapshot) => {
            snapshot.docs.forEach(doc => {
                const tmpObj = {
                    doc: doc.data(),
                    id: doc.id
                }
                list.push(tmpObj);
            });
            return list;
        });
    }

    async addSeasons(rootRef, seasonsObj) {
        return rootRef.add(seasonsObj);
    }

    async getSeasons(rootRef) {
        var seasons = [];
        return rootRef.get().then((snapshot) => {
            snapshot.docs.forEach(doc => {
                seasons.push(doc.data());
            });
            seasons.sort(function (a, b) {
                return a.seasonID - b.seasonID;
            });
            return seasons;
        });
    }

    async updateRelatedShows(rootRef, docID, relatedShows) {
        return rootRef.doc(docID).update({
            relatedShows: relatedShows
        });
    }

    async addComments(rootRef, commentObj) {
        return rootRef.add(commentObj);
    }

    async getComments(rootRef) {
        var list = [];
        return rootRef.get().then((snapshot) => {
            snapshot.docs.forEach(doc => {
                list.push(doc.data());
            });
            list.sort(function (a, b) {
                return a.time.seconds - b.time.seconds;
            });
            return list;
        });
    }
}
