import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const addDocuments = mutation({
    args : {
        context : v.string(),
        type : v.string(),
        format : v.string(),
        result : v.string(),
        title : v.string()
    },
    handler : async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new Error("Unauthorized");
        }

        return await ctx.db.insert("document" , {
            context : args.context,
            type : args.type,
            format : args.format,
            result : [{
                title : args.title,
                content : args.result,
            }],
            isFavorites : false,
            isTrash : false,
        });
    },
});

export const getDocumentList = query({
    args : {
        context : v.optional(v.string()),
    },
    handler : async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new Error("Unauthorized");
        }

        if (args.context?.length) {
            return await ctx.db
            .query("document")
            .withSearchIndex("search_title" , (q) => 
                q.search("context" , args.context!)
            )
            .collect();
        }else {
            return await ctx.db.query("document").collect();
        }
    },
});

export const addMoreDocumentResult = mutation({
    args : {
        title : v.string(),
        content : v.string(),
        id : v.id("document"),
    },
    handler : async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new Error("Unauthorized");
        }

        const document = await ctx.db.get(args.id);
        if (!document) {
            throw new Error("Document not found");
        }
        return await ctx.db.patch(args.id, {
            result: [...document.result, { title: args.title, content: args.content }],
        });
    },
})

export const getDocumentById = query({
    args : {
        id : v.id("document")
    },
    handler : async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new Error("Unauthorized");
        }

        return await ctx.db.get(args.id)
    },
});

export const updateDocumentIsFavorites = mutation({
    args : {
        id : v.id("document"),
    },
    handler : async (ctx, args)  => {
        
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new Error("Unauthorized");
        }
        const document = await ctx.db.get(args.id);
        if (!document) {
            throw new Error("Document not found");
        }
        return await ctx.db.patch(args.id, {
            isFavorites: document.isFavorites ? false : true, 
        });
    },
})

export const updateDocumentIsTrash = mutation({
    args : {   
        id : v.id("document"),
    },
    handler : async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new Error("Unauthorized");
        }
        const document = await ctx.db.get(args.id);
        if (!document) {
            throw new Error("Document not found");
        }
        return await ctx.db.patch(args.id, {
            isTrash: document.isTrash ? false : true, 
        });
    },      
})

export const deleteDocument = mutation({
    args : {
        id : v.id("document"),
    },
    handler : async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new Error("Unauthorized");
        }
        const document = await ctx.db.get(args.id);
        if (!document) {
            throw new Error("Document not found");
        }
        return await ctx.db.delete(args.id);
    },
})

