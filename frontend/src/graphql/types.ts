import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
};

export type Article = {
  __typename?: 'Article';
  comments?: Maybe<Array<Comment>>;
  content: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  imageUrl?: Maybe<Scalars['String']['output']>;
  perex: Scalars['String']['output'];
  state: ArticleState;
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  user: User;
};

export enum ArticleState {
  Draft = 'DRAFT',
  Hidden = 'HIDDEN',
  Published = 'PUBLISHED'
}

export type Comment = {
  __typename?: 'Comment';
  article: Article;
  content: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  updatedAt: Scalars['DateTime']['output'];
  user: User;
  voteTypeCounts: Array<VoteTypeCount>;
  votes?: Maybe<Array<Vote>>;
};

export type CreateArticleInput = {
  content: Scalars['String']['input'];
  imageUrl?: InputMaybe<Scalars['String']['input']>;
  perex: Scalars['String']['input'];
  state: ArticleState;
  title: Scalars['String']['input'];
};

export type CreateCommentInput = {
  articleId: Scalars['ID']['input'];
  content: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  changeState: Article;
  createArticle: Article;
  createComment: Comment;
  removeArticle: Scalars['Boolean']['output'];
  removeComment: Scalars['Boolean']['output'];
  removeVote: Scalars['Boolean']['output'];
  updateArticle: Article;
  updateComment: Comment;
  updateOrCreateVote?: Maybe<Vote>;
};


export type MutationChangeStateArgs = {
  id: Scalars['ID']['input'];
  state: ArticleState;
};


export type MutationCreateArticleArgs = {
  createArticleInput: CreateArticleInput;
};


export type MutationCreateCommentArgs = {
  createCommentInput: CreateCommentInput;
};


export type MutationRemoveArticleArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveCommentArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemoveVoteArgs = {
  id: Scalars['ID']['input'];
};


export type MutationUpdateArticleArgs = {
  updateArticleInput: UpdateArticleInput;
};


export type MutationUpdateCommentArgs = {
  updateCommentInput: UpdateCommentInput;
};


export type MutationUpdateOrCreateVoteArgs = {
  updateOrCreateVoteInput: UpdateOrCreateVoteInput;
};

export type Query = {
  __typename?: 'Query';
  article: Article;
  articleComments: Array<Comment>;
  articles: Array<Article>;
  me: User;
  user: User;
  userArticle: Article;
  userArticles: Array<Article>;
};


export type QueryArticleArgs = {
  id: Scalars['ID']['input'];
};


export type QueryArticleCommentsArgs = {
  articleId: Scalars['ID']['input'];
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryArticlesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryUserArgs = {
  id: Scalars['ID']['input'];
};


export type QueryUserArticleArgs = {
  id: Scalars['ID']['input'];
};

export type UpdateArticleInput = {
  content?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  imageUrl?: InputMaybe<Scalars['String']['input']>;
  perex?: InputMaybe<Scalars['String']['input']>;
  state?: InputMaybe<ArticleState>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateCommentInput = {
  articleId?: InputMaybe<Scalars['ID']['input']>;
  content?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
};

export type UpdateOrCreateVoteInput = {
  commentId?: InputMaybe<Scalars['ID']['input']>;
  type?: InputMaybe<VoteType>;
};

export type User = {
  __typename?: 'User';
  articles?: Maybe<Array<Article>>;
  comments?: Maybe<Array<Comment>>;
  createdAt: Scalars['DateTime']['output'];
  firstName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  lastName: Scalars['String']['output'];
  middleName?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  username: Scalars['String']['output'];
};

export type Vote = {
  __typename?: 'Vote';
  comment: Comment;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  type: VoteType;
  updatedAt: Scalars['DateTime']['output'];
  user: User;
};

export enum VoteType {
  Down = 'DOWN',
  Up = 'UP'
}

export type VoteTypeCount = {
  __typename?: 'VoteTypeCount';
  count: Scalars['Int']['output'];
  type: VoteType;
  voted?: Maybe<Scalars['Boolean']['output']>;
};

export type CreateArticleMutationVariables = Exact<{
  input: CreateArticleInput;
}>;


export type CreateArticleMutation = { __typename?: 'Mutation', createArticle: { __typename?: 'Article', id: string, state: ArticleState, createdAt: any, updatedAt: any, title: string } };

export type UpdateArticleMutationVariables = Exact<{
  input: UpdateArticleInput;
}>;


export type UpdateArticleMutation = { __typename?: 'Mutation', updateArticle: { __typename?: 'Article', id: string, state: ArticleState, createdAt: any, updatedAt: any, title: string } };

export type GetUserArticleQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetUserArticleQuery = { __typename?: 'Query', userArticle: { __typename?: 'Article', id: string, title: string, perex: string, createdAt: any, imageUrl?: string | null, content: string } };

export type GetArticlesQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetArticlesQuery = { __typename?: 'Query', articles: Array<{ __typename?: 'Article', id: string, title: string, perex: string, createdAt: any, imageUrl?: string | null, user: { __typename?: 'User', id: string, firstName: string, lastName: string, middleName?: string | null } }> };

export type GetUserArticlesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserArticlesQuery = { __typename?: 'Query', userArticles: Array<{ __typename?: 'Article', id: string, title: string, createdAt: any, updatedAt: any, state: ArticleState }> };

export type GetArticleQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetArticleQuery = { __typename?: 'Query', article: { __typename?: 'Article', id: string, title: string, perex: string, createdAt: any, imageUrl?: string | null, content: string, user: { __typename?: 'User', id: string, firstName: string, lastName: string, middleName?: string | null } } };

export type GetArticleCommentsQueryVariables = Exact<{
  articleId: Scalars['ID']['input'];
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetArticleCommentsQuery = { __typename?: 'Query', articleComments: Array<{ __typename?: 'Comment', id: string, content: string, createdAt: any, updatedAt: any, voteTypeCounts: Array<{ __typename?: 'VoteTypeCount', type: VoteType, count: number, voted?: boolean | null }>, user: { __typename?: 'User', id: string, username: string, firstName: string, lastName: string } }> };

export type VoteArticleCommentMutationVariables = Exact<{
  input: UpdateOrCreateVoteInput;
}>;


export type VoteArticleCommentMutation = { __typename?: 'Mutation', updateOrCreateVote?: { __typename?: 'Vote', comment: { __typename?: 'Comment', id: string, voteTypeCounts: Array<{ __typename?: 'VoteTypeCount', type: VoteType, count: number, voted?: boolean | null }> } } | null };

export type CreateCommentMutationVariables = Exact<{
  input: CreateCommentInput;
}>;


export type CreateCommentMutation = { __typename?: 'Mutation', createComment: { __typename?: 'Comment', id: string, content: string, createdAt: any, updatedAt: any, voteTypeCounts: Array<{ __typename?: 'VoteTypeCount', type: VoteType, count: number, voted?: boolean | null }>, user: { __typename?: 'User', id: string, username: string, firstName: string, lastName: string } } };


export const CreateArticleDocument = gql`
    mutation createArticle($input: CreateArticleInput!) {
  createArticle(createArticleInput: $input) {
    id
    state
    createdAt
    updatedAt
    title
  }
}
    `;
export type CreateArticleMutationFn = Apollo.MutationFunction<CreateArticleMutation, CreateArticleMutationVariables>;

/**
 * __useCreateArticleMutation__
 *
 * To run a mutation, you first call `useCreateArticleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateArticleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createArticleMutation, { data, loading, error }] = useCreateArticleMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateArticleMutation(baseOptions?: Apollo.MutationHookOptions<CreateArticleMutation, CreateArticleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateArticleMutation, CreateArticleMutationVariables>(CreateArticleDocument, options);
      }
export type CreateArticleMutationHookResult = ReturnType<typeof useCreateArticleMutation>;
export type CreateArticleMutationResult = Apollo.MutationResult<CreateArticleMutation>;
export type CreateArticleMutationOptions = Apollo.BaseMutationOptions<CreateArticleMutation, CreateArticleMutationVariables>;
export const UpdateArticleDocument = gql`
    mutation updateArticle($input: UpdateArticleInput!) {
  updateArticle(updateArticleInput: $input) {
    id
    state
    createdAt
    updatedAt
    title
  }
}
    `;
export type UpdateArticleMutationFn = Apollo.MutationFunction<UpdateArticleMutation, UpdateArticleMutationVariables>;

/**
 * __useUpdateArticleMutation__
 *
 * To run a mutation, you first call `useUpdateArticleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateArticleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateArticleMutation, { data, loading, error }] = useUpdateArticleMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateArticleMutation(baseOptions?: Apollo.MutationHookOptions<UpdateArticleMutation, UpdateArticleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateArticleMutation, UpdateArticleMutationVariables>(UpdateArticleDocument, options);
      }
export type UpdateArticleMutationHookResult = ReturnType<typeof useUpdateArticleMutation>;
export type UpdateArticleMutationResult = Apollo.MutationResult<UpdateArticleMutation>;
export type UpdateArticleMutationOptions = Apollo.BaseMutationOptions<UpdateArticleMutation, UpdateArticleMutationVariables>;
export const GetUserArticleDocument = gql`
    query getUserArticle($id: ID!) {
  userArticle(id: $id) {
    id
    title
    perex
    createdAt
    imageUrl
    content
  }
}
    `;

/**
 * __useGetUserArticleQuery__
 *
 * To run a query within a React component, call `useGetUserArticleQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserArticleQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserArticleQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetUserArticleQuery(baseOptions: Apollo.QueryHookOptions<GetUserArticleQuery, GetUserArticleQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserArticleQuery, GetUserArticleQueryVariables>(GetUserArticleDocument, options);
      }
export function useGetUserArticleLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserArticleQuery, GetUserArticleQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserArticleQuery, GetUserArticleQueryVariables>(GetUserArticleDocument, options);
        }
export function useGetUserArticleSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetUserArticleQuery, GetUserArticleQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetUserArticleQuery, GetUserArticleQueryVariables>(GetUserArticleDocument, options);
        }
export type GetUserArticleQueryHookResult = ReturnType<typeof useGetUserArticleQuery>;
export type GetUserArticleLazyQueryHookResult = ReturnType<typeof useGetUserArticleLazyQuery>;
export type GetUserArticleSuspenseQueryHookResult = ReturnType<typeof useGetUserArticleSuspenseQuery>;
export type GetUserArticleQueryResult = Apollo.QueryResult<GetUserArticleQuery, GetUserArticleQueryVariables>;
export const GetArticlesDocument = gql`
    query getArticles($limit: Int, $offset: Int) {
  articles(limit: $limit, offset: $offset) {
    id
    title
    perex
    createdAt
    imageUrl
    user {
      id
      firstName
      lastName
      middleName
    }
  }
}
    `;

/**
 * __useGetArticlesQuery__
 *
 * To run a query within a React component, call `useGetArticlesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetArticlesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetArticlesQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *   },
 * });
 */
export function useGetArticlesQuery(baseOptions?: Apollo.QueryHookOptions<GetArticlesQuery, GetArticlesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetArticlesQuery, GetArticlesQueryVariables>(GetArticlesDocument, options);
      }
export function useGetArticlesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetArticlesQuery, GetArticlesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetArticlesQuery, GetArticlesQueryVariables>(GetArticlesDocument, options);
        }
export function useGetArticlesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetArticlesQuery, GetArticlesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetArticlesQuery, GetArticlesQueryVariables>(GetArticlesDocument, options);
        }
export type GetArticlesQueryHookResult = ReturnType<typeof useGetArticlesQuery>;
export type GetArticlesLazyQueryHookResult = ReturnType<typeof useGetArticlesLazyQuery>;
export type GetArticlesSuspenseQueryHookResult = ReturnType<typeof useGetArticlesSuspenseQuery>;
export type GetArticlesQueryResult = Apollo.QueryResult<GetArticlesQuery, GetArticlesQueryVariables>;
export const GetUserArticlesDocument = gql`
    query getUserArticles {
  userArticles {
    id
    title
    createdAt
    updatedAt
    state
  }
}
    `;

/**
 * __useGetUserArticlesQuery__
 *
 * To run a query within a React component, call `useGetUserArticlesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserArticlesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserArticlesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUserArticlesQuery(baseOptions?: Apollo.QueryHookOptions<GetUserArticlesQuery, GetUserArticlesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserArticlesQuery, GetUserArticlesQueryVariables>(GetUserArticlesDocument, options);
      }
export function useGetUserArticlesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserArticlesQuery, GetUserArticlesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserArticlesQuery, GetUserArticlesQueryVariables>(GetUserArticlesDocument, options);
        }
export function useGetUserArticlesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetUserArticlesQuery, GetUserArticlesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetUserArticlesQuery, GetUserArticlesQueryVariables>(GetUserArticlesDocument, options);
        }
export type GetUserArticlesQueryHookResult = ReturnType<typeof useGetUserArticlesQuery>;
export type GetUserArticlesLazyQueryHookResult = ReturnType<typeof useGetUserArticlesLazyQuery>;
export type GetUserArticlesSuspenseQueryHookResult = ReturnType<typeof useGetUserArticlesSuspenseQuery>;
export type GetUserArticlesQueryResult = Apollo.QueryResult<GetUserArticlesQuery, GetUserArticlesQueryVariables>;
export const GetArticleDocument = gql`
    query getArticle($id: ID!) {
  article(id: $id) {
    id
    title
    perex
    createdAt
    imageUrl
    content
    user {
      id
      firstName
      lastName
      middleName
    }
  }
}
    `;

/**
 * __useGetArticleQuery__
 *
 * To run a query within a React component, call `useGetArticleQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetArticleQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetArticleQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetArticleQuery(baseOptions: Apollo.QueryHookOptions<GetArticleQuery, GetArticleQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetArticleQuery, GetArticleQueryVariables>(GetArticleDocument, options);
      }
export function useGetArticleLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetArticleQuery, GetArticleQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetArticleQuery, GetArticleQueryVariables>(GetArticleDocument, options);
        }
export function useGetArticleSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetArticleQuery, GetArticleQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetArticleQuery, GetArticleQueryVariables>(GetArticleDocument, options);
        }
export type GetArticleQueryHookResult = ReturnType<typeof useGetArticleQuery>;
export type GetArticleLazyQueryHookResult = ReturnType<typeof useGetArticleLazyQuery>;
export type GetArticleSuspenseQueryHookResult = ReturnType<typeof useGetArticleSuspenseQuery>;
export type GetArticleQueryResult = Apollo.QueryResult<GetArticleQuery, GetArticleQueryVariables>;
export const GetArticleCommentsDocument = gql`
    query getArticleComments($articleId: ID!, $limit: Int, $offset: Int) {
  articleComments(articleId: $articleId, limit: $limit, offset: $offset) {
    id
    voteTypeCounts {
      type
      count
      voted
    }
    user {
      id
      username
      firstName
      lastName
    }
    content
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useGetArticleCommentsQuery__
 *
 * To run a query within a React component, call `useGetArticleCommentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetArticleCommentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetArticleCommentsQuery({
 *   variables: {
 *      articleId: // value for 'articleId'
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *   },
 * });
 */
export function useGetArticleCommentsQuery(baseOptions: Apollo.QueryHookOptions<GetArticleCommentsQuery, GetArticleCommentsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetArticleCommentsQuery, GetArticleCommentsQueryVariables>(GetArticleCommentsDocument, options);
      }
export function useGetArticleCommentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetArticleCommentsQuery, GetArticleCommentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetArticleCommentsQuery, GetArticleCommentsQueryVariables>(GetArticleCommentsDocument, options);
        }
export function useGetArticleCommentsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetArticleCommentsQuery, GetArticleCommentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetArticleCommentsQuery, GetArticleCommentsQueryVariables>(GetArticleCommentsDocument, options);
        }
export type GetArticleCommentsQueryHookResult = ReturnType<typeof useGetArticleCommentsQuery>;
export type GetArticleCommentsLazyQueryHookResult = ReturnType<typeof useGetArticleCommentsLazyQuery>;
export type GetArticleCommentsSuspenseQueryHookResult = ReturnType<typeof useGetArticleCommentsSuspenseQuery>;
export type GetArticleCommentsQueryResult = Apollo.QueryResult<GetArticleCommentsQuery, GetArticleCommentsQueryVariables>;
export const VoteArticleCommentDocument = gql`
    mutation voteArticleComment($input: UpdateOrCreateVoteInput!) {
  updateOrCreateVote(updateOrCreateVoteInput: $input) {
    comment {
      id
      voteTypeCounts {
        type
        count
        voted
      }
    }
  }
}
    `;
export type VoteArticleCommentMutationFn = Apollo.MutationFunction<VoteArticleCommentMutation, VoteArticleCommentMutationVariables>;

/**
 * __useVoteArticleCommentMutation__
 *
 * To run a mutation, you first call `useVoteArticleCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVoteArticleCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [voteArticleCommentMutation, { data, loading, error }] = useVoteArticleCommentMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useVoteArticleCommentMutation(baseOptions?: Apollo.MutationHookOptions<VoteArticleCommentMutation, VoteArticleCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<VoteArticleCommentMutation, VoteArticleCommentMutationVariables>(VoteArticleCommentDocument, options);
      }
export type VoteArticleCommentMutationHookResult = ReturnType<typeof useVoteArticleCommentMutation>;
export type VoteArticleCommentMutationResult = Apollo.MutationResult<VoteArticleCommentMutation>;
export type VoteArticleCommentMutationOptions = Apollo.BaseMutationOptions<VoteArticleCommentMutation, VoteArticleCommentMutationVariables>;
export const CreateCommentDocument = gql`
    mutation createComment($input: CreateCommentInput!) {
  createComment(createCommentInput: $input) {
    id
    voteTypeCounts {
      type
      count
      voted
    }
    user {
      id
      username
      firstName
      lastName
    }
    content
    createdAt
    updatedAt
  }
}
    `;
export type CreateCommentMutationFn = Apollo.MutationFunction<CreateCommentMutation, CreateCommentMutationVariables>;

/**
 * __useCreateCommentMutation__
 *
 * To run a mutation, you first call `useCreateCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCommentMutation, { data, loading, error }] = useCreateCommentMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateCommentMutation(baseOptions?: Apollo.MutationHookOptions<CreateCommentMutation, CreateCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCommentMutation, CreateCommentMutationVariables>(CreateCommentDocument, options);
      }
export type CreateCommentMutationHookResult = ReturnType<typeof useCreateCommentMutation>;
export type CreateCommentMutationResult = Apollo.MutationResult<CreateCommentMutation>;
export type CreateCommentMutationOptions = Apollo.BaseMutationOptions<CreateCommentMutation, CreateCommentMutationVariables>;