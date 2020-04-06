// import React from 'react';
// import * as firebase from 'firebase';

// const rootRef = firebase.firestore();
export class APICallsService {
    addShows(rootRef, showObj, printer) {
        rootRef.add(showObj).then(() => {
            printer();
        });
    }

    async getProviders(rootRef) {
        var list = [];
        return rootRef.get().then((snapshot) => {
            snapshot.docs.forEach(doc => {
                list.push(doc.data());
            });
            return list;
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

    async addRelatedShows(rootRef, docID, relatedShows) {
        return rootRef.doc(docID).update({
            relatedShows: relatedShows
        });
    }

    async deleteRelatedShows(rootRef, docID, relatedShows) {
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
