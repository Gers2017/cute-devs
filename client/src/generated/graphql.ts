import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type CreatePostInput = {
  creatorId: Scalars['ID'];
  text: Scalars['String'];
};

export type CuteDev = {
  __typename?: 'CuteDev';
  bio: Scalars['String'];
  createdAt: Scalars['String'];
  id: Scalars['ID'];
  /** Url of the image used by this cute dev */
  imageUrl: Scalars['String'];
  languages: Array<Scalars['String']>;
  posts?: Maybe<Array<Post>>;
  projects: Array<Scalars['String']>;
  updatedAt: Scalars['String'];
  username: Scalars['String'];
};

export type CuteDevResponse = {
  __typename?: 'CuteDevResponse';
  cuteDev?: Maybe<CuteDev>;
  errors?: Maybe<Array<FieldError>>;
};

export type DeleteResponse = {
  __typename?: 'DeleteResponse';
  deleted: Scalars['Boolean'];
  errors?: Maybe<Array<FieldError>>;
};

export type EditCuteDevInput = {
  editInput: PartialCuteDevInput;
  id: Scalars['ID'];
};

export type ErrorMessage = {
  __typename?: 'ErrorMessage';
  message: Scalars['String'];
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createPost?: Maybe<Post>;
  deleteCuteDev: DeleteResponse;
  deletePost: DeleteResponse;
  editCuteDev?: Maybe<CuteDev>;
  login: CuteDevResponse;
  registerCuteDev: CuteDevResponse;
  starPost: StarPostResponse;
};


export type MutationCreatePostArgs = {
  input: CreatePostInput;
};


export type MutationDeleteCuteDevArgs = {
  id: Scalars['String'];
};


export type MutationDeletePostArgs = {
  id: Scalars['String'];
};


export type MutationEditCuteDevArgs = {
  input: EditCuteDevInput;
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  username: Scalars['String'];
};


export type MutationRegisterCuteDevArgs = {
  password: Scalars['String'];
  username: Scalars['String'];
};


export type MutationStarPostArgs = {
  postId: Scalars['String'];
};

export type PartialCuteDevInput = {
  bio?: Maybe<Scalars['String']>;
  imageUrl?: Maybe<Scalars['String']>;
  languages?: Maybe<Array<Scalars['String']>>;
  projects?: Maybe<Array<Scalars['String']>>;
  username?: Maybe<Scalars['String']>;
};

export type Post = {
  __typename?: 'Post';
  creator: CuteDev;
  date: Scalars['String'];
  id: Scalars['ID'];
  stars: Scalars['Float'];
  text: Scalars['String'];
};

export type PostsInput = {
  creatorId?: Maybe<Scalars['ID']>;
  reverse?: Maybe<Scalars['Boolean']>;
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
};

export type Query = {
  __typename?: 'Query';
  cuteDev?: Maybe<CuteDev>;
  cuteDevs: Array<CuteDev>;
  me: Scalars['Boolean'];
  post?: Maybe<Post>;
  posts: Array<Post>;
};


export type QueryCuteDevArgs = {
  id: Scalars['String'];
};


export type QueryCuteDevsArgs = {
  limit?: Maybe<Scalars['Float']>;
};


export type QueryPostArgs = {
  id: Scalars['String'];
};


export type QueryPostsArgs = {
  input: PostsInput;
};

export type StarPostResponse = {
  __typename?: 'StarPostResponse';
  error?: Maybe<ErrorMessage>;
  stars?: Maybe<Scalars['Int']>;
};

export type EditCuteDevMutationVariables = Exact<{
  input: EditCuteDevInput;
}>;


export type EditCuteDevMutation = { __typename?: 'Mutation', editCuteDev?: { __typename?: 'CuteDev', id: string, username: string, bio: string, imageUrl: string, languages: Array<string>, projects: Array<string> } | null | undefined };

export type LoginCutedevMutationVariables = Exact<{
  password: Scalars['String'];
  username: Scalars['String'];
}>;


export type LoginCutedevMutation = { __typename?: 'Mutation', login: { __typename?: 'CuteDevResponse', cuteDev?: { __typename?: 'CuteDev', id: string, username: string } | null | undefined, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null | undefined } };

export type RegisterCutedevMutationVariables = Exact<{
  password: Scalars['String'];
  username: Scalars['String'];
}>;


export type RegisterCutedevMutation = { __typename?: 'Mutation', registerCuteDev: { __typename?: 'CuteDevResponse', cuteDev?: { __typename?: 'CuteDev', id: string, username: string, createdAt: string, updatedAt: string } | null | undefined, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null | undefined } };

export type StartPostMutationVariables = Exact<{
  postId: Scalars['String'];
}>;


export type StartPostMutation = { __typename?: 'Mutation', starPost: { __typename?: 'StarPostResponse', stars?: number | null | undefined, error?: { __typename?: 'ErrorMessage', message: string } | null | undefined } };

export type GetCuteDevPostsQueryVariables = Exact<{
  input: PostsInput;
}>;


export type GetCuteDevPostsQuery = { __typename?: 'Query', posts: Array<{ __typename?: 'Post', id: string, stars: number, text: string, date: string }> };

export type GetCuteDevProfileQueryVariables = Exact<{
  cuteDevId: Scalars['String'];
}>;


export type GetCuteDevProfileQuery = { __typename?: 'Query', cuteDev?: { __typename?: 'CuteDev', id: string, username: string, bio: string, imageUrl: string, languages: Array<string>, projects: Array<string> } | null | undefined };

export type GetPostsQueryVariables = Exact<{
  input: PostsInput;
}>;


export type GetPostsQuery = { __typename?: 'Query', posts: Array<{ __typename?: 'Post', id: string, text: string, stars: number, date: string, creator: { __typename?: 'CuteDev', id: string, username: string, imageUrl: string } }> };

export type IsLoggedQueryVariables = Exact<{ [key: string]: never; }>;


export type IsLoggedQuery = { __typename?: 'Query', me: boolean };


export const EditCuteDevDocument = gql`
    mutation EditCuteDev($input: EditCuteDevInput!) {
  editCuteDev(input: $input) {
    id
    username
    bio
    imageUrl
    languages
    projects
  }
}
    `;

export function useEditCuteDevMutation() {
  return Urql.useMutation<EditCuteDevMutation, EditCuteDevMutationVariables>(EditCuteDevDocument);
};
export const LoginCutedevDocument = gql`
    mutation LoginCutedev($password: String!, $username: String!) {
  login(password: $password, username: $username) {
    cuteDev {
      id
      username
    }
    errors {
      field
      message
    }
  }
}
    `;

export function useLoginCutedevMutation() {
  return Urql.useMutation<LoginCutedevMutation, LoginCutedevMutationVariables>(LoginCutedevDocument);
};
export const RegisterCutedevDocument = gql`
    mutation RegisterCutedev($password: String!, $username: String!) {
  registerCuteDev(password: $password, username: $username) {
    cuteDev {
      id
      username
      createdAt
      updatedAt
    }
    errors {
      field
      message
    }
  }
}
    `;

export function useRegisterCutedevMutation() {
  return Urql.useMutation<RegisterCutedevMutation, RegisterCutedevMutationVariables>(RegisterCutedevDocument);
};
export const StartPostDocument = gql`
    mutation StartPost($postId: String!) {
  starPost(postId: $postId) {
    stars
    error {
      message
    }
  }
}
    `;

export function useStartPostMutation() {
  return Urql.useMutation<StartPostMutation, StartPostMutationVariables>(StartPostDocument);
};
export const GetCuteDevPostsDocument = gql`
    query GetCuteDevPosts($input: PostsInput!) {
  posts(input: $input) {
    id
    stars
    text
    date
  }
}
    `;

export function useGetCuteDevPostsQuery(options: Omit<Urql.UseQueryArgs<GetCuteDevPostsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetCuteDevPostsQuery>({ query: GetCuteDevPostsDocument, ...options });
};
export const GetCuteDevProfileDocument = gql`
    query GetCuteDevProfile($cuteDevId: String!) {
  cuteDev(id: $cuteDevId) {
    id
    username
    bio
    imageUrl
    languages
    projects
  }
}
    `;

export function useGetCuteDevProfileQuery(options: Omit<Urql.UseQueryArgs<GetCuteDevProfileQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetCuteDevProfileQuery>({ query: GetCuteDevProfileDocument, ...options });
};
export const GetPostsDocument = gql`
    query GetPosts($input: PostsInput!) {
  posts(input: $input) {
    id
    text
    stars
    date
    creator {
      id
      username
      imageUrl
    }
  }
}
    `;

export function useGetPostsQuery(options: Omit<Urql.UseQueryArgs<GetPostsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetPostsQuery>({ query: GetPostsDocument, ...options });
};
export const IsLoggedDocument = gql`
    query IsLogged {
  me
}
    `;

export function useIsLoggedQuery(options: Omit<Urql.UseQueryArgs<IsLoggedQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<IsLoggedQuery>({ query: IsLoggedDocument, ...options });
};