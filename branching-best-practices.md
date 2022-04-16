# Hello!

I thought this would be the best way to talk about branches and pull requests
(PRs). Basically, a branch isolates the code you are working on from the main
code file so that experimental or not-yet-working features can be discussed 
with other team members before merging with the main code file.

We start like this:

- When you git clone a repo, it includes the main branch and references to all
  sub-branches.

- `git branch` to see all branches and which branch you are on
- `git checkout <branchname>` to swith to a branch that exists
- `git checkout -b <branchname>` to create a new branch

If you `git branch` in a repo you just cloned, you will not see sub-branches
that are not local, but you can switch to them with `git checkout <branchname>`

A new branch has all of the same files as the branch it was forked from, but it
has no commits until you make a commit. The first time you try to commit on a
new branch, it will have no upstream branch in github, so you need to set the
upstream origin branch like this:

- `git push --set-upstream origin <branchname>`

You can create or switch to a new branch any time before making a commit
on that branch. You can switch between branches on github using the 
'branches' dropdown to the upper-left of the file list.

When a branch has been pushed to github that is not identical to the main
branch, you will see a field that says "<branchname> had recent pushes 27
minutes ago" and a button that says "Compare & pull request." Click that 
button and scroll down and you will see a comment field followed by a 
detailed list of all differences (the same as typing `git diff` in your 
terminal). In the comment field, you should write a message similar to a 
commit message, but covering all commits on the branch. After that, you can 
click 'Create pull request' to submit your changes to be merged.

At this point, everyone who has access to the repo can see your changes and 
comment on them. This is where the actual collaboration happens. You can 
take this inout from your peers and use it to refine your branch. When you 
view the pull request, you will be on the 'conversations' tab. Switch over 
to the 'Files Changed' tabs for some real collaboration!

Here you can start conversations about individual lines of code. Hover over 
the line you want to comment and click the + button, and you can either add 
a single comment (which starts a conversation) or start a review. A 
conversation will end up being resolved (or not) and will not show up in the 
pull request conversation. A review will show up in the PR conversation, 
along with a snippet of the code being talked about. Basically, start a 
review when you absolutely need input or feedback, add a single comment to 
say, "good job" or something.

Only those with write access to the repo can approve a pull request, but
they can also refuse it. Neither of these options deletes the branch, so if 
the PR is refused, you can still work on it and make another PR later. If 
the PR is accepted, it gets merged and you can (and should) delete the local
branch:

- `git branch -d <branchname>`

Note that you cannot delete the branch you are currently working from. Also,
a remote branch (like on github or heroku) is separate from a local branch.

- `git branch -a` shows all branches, local and remote.
- `git branch -r` shows only remote branches

To delete a remote branch, we `git push` to the origin of that branch with
the `-d` flag,

- `git push origin -d <branchname>`

In order to test this all out, I have submitted this branch for a pull 
request. Check out the diff, make comments, test out whatever you want.