import { build, fake, oneOf, sequence } from "@jackfranklin/test-data-bot";

export const fakeIssue = build("Issue", {
    fields: {
        comments_url: fake(f => f.internet.url()),
        id: sequence(),
        state: oneOf("open", "closed"),
        number: fake(f => f.random.number()),
        title: fake(f => f.lorem.text()),
        user: {
            login: fake(f => f.internet.userName()),
            avatar_url: fake(f => f.image.imageUrl())
        },
    
        labels: [{
            id: fake(f => f.random.number()),
            name: 'activejob',
            color: fake(f => f.internet.color())
        }],
        comments: fake(f => f.random.number()),
        body: fake(f => f.lorem.sentences())
    }
});

export const fakeIssues = [fakeIssue(), fakeIssue(), fakeIssue()];
