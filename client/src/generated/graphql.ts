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

export type AuthUserResponse = {
  __typename?: 'AuthUserResponse';
  error?: Maybe<OperationError>;
  success: Scalars['Boolean'];
};

export type CreatePostdevResponse = {
  __typename?: 'CreatePostdevResponse';
  error?: Maybe<OperationError>;
  post?: Maybe<Post>;
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

export type CuteDevsInput = {
  limit?: Maybe<Scalars['Int']>;
};

export type DeleteResponse = {
  __typename?: 'DeleteResponse';
  deleted: Scalars['Boolean'];
  error?: Maybe<OperationError>;
};

export type EditCuteDevInput = {
  bio?: Maybe<Scalars['String']>;
  imageUrl?: Maybe<Scalars['String']>;
  languages?: Maybe<Array<Scalars['String']>>;
  projects?: Maybe<Array<Scalars['String']>>;
  username?: Maybe<Scalars['String']>;
};

export type EditCutedevResponse = {
  __typename?: 'EditCutedevResponse';
  edited?: Maybe<EditedCutedev>;
  error?: Maybe<OperationError>;
};

export type EditedCutedev = {
  __typename?: 'EditedCutedev';
  bio?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  imageUrl?: Maybe<Scalars['String']>;
  languages?: Maybe<Array<Scalars['String']>>;
  projects?: Maybe<Array<Scalars['String']>>;
  username?: Maybe<Scalars['String']>;
};

export type LogoutResponse = {
  __typename?: 'LogoutResponse';
  error?: Maybe<OperationError>;
  success: Scalars['Boolean'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createPost: CreatePostdevResponse;
  deleteCuteDev: DeleteResponse;
  deletePost: DeleteResponse;
  editCutedevProfile: EditCutedevResponse;
  login: TokenResponse;
  logout: LogoutResponse;
  refresh: AuthUserResponse;
  registerCuteDev: TokenResponse;
  starPost: StarPostResponse;
};


export type MutationCreatePostArgs = {
  text: Scalars['String'];
};


export type MutationDeletePostArgs = {
  postId: Scalars['String'];
};


export type MutationEditCutedevProfileArgs = {
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

export type OperationError = {
  __typename?: 'OperationError';
  details: Scalars['String'];
  type: Scalars['String'];
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
  me: AuthUserResponse;
  post?: Maybe<Post>;
  posts: Array<Post>;
};


export type QueryCuteDevArgs = {
  id: Scalars['String'];
};


export type QueryCuteDevsArgs = {
  input: CuteDevsInput;
};


export type QueryPostArgs = {
  id: Scalars['String'];
};


export type QueryPostsArgs = {
  input: PostsInput;
};

export type StarPostResponse = {
  __typename?: 'StarPostResponse';
  error?: Maybe<OperationError>;
  stars?: Maybe<Scalars['Int']>;
};

export type TokenResponse = {
  __typename?: 'TokenResponse';
  accessToken?: Maybe<Scalars['String']>;
  error?: Maybe<OperationError>;
};

export type CreatePostMutationVariables = Exact<{
  text: Scalars['String'];
}>;


export type CreatePostMutation = { __typename?: 'Mutation', createPost: { __typename?: 'CreatePostdevResponse', post?: { __typename?: 'Post', id: string, text: string, stars: number, date: string, creator: { __typename?: 'CuteDev', username: string, imageUrl: string } } | null | undefined, error?: { __typename?: 'OperationError', type: string, details: string } | null | undefined } };

export type DeletePostMutationVariables = Exact<{
  postId: Scalars['String'];
}>;


export type DeletePostMutation = { __typename?: 'Mutation', deletePost: { __typename?: 'DeleteResponse', deleted: boolean, error?: { __typename?: 'OperationError', type: string, details: string } | null | undefined } };

export type EditCutedevMutationVariables = Exact<{
  input: EditCuteDevInput;
}>;


export type EditCutedevMutation = { __typename?: 'Mutation', editCutedevProfile: { __typename?: 'EditCutedevResponse', edited?: { __typename?: 'EditedCutedev', username?: string | null | undefined, bio?: string | null | undefined, imageUrl?: string | null | undefined, languages?: Array<string> | null | undefined, projects?: Array<string> | null | undefined } | null | undefined, error?: { __typename?: 'OperationError', type: string, details: string } | null | undefined } };

export type LoginMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'TokenResponse', accessToken?: string | null | undefined, error?: { __typename?: 'OperationError', type: string, details: string } | null | undefined } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: { __typename?: 'LogoutResponse', success: boolean, error?: { __typename?: 'OperationError', type: string, details: string } | null | undefined } };

export type RegisterMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type RegisterMutation = { __typename?: 'Mutation', registerCuteDev: { __typename?: 'TokenResponse', accessToken?: string | null | undefined, error?: { __typename?: 'OperationError', type: string, details: string } | null | undefined } };

export type StarPostMutationVariables = Exact<{
  postId: Scalars['String'];
}>;


export type StarPostMutation = { __typename?: 'Mutation', starPost: { __typename?: 'StarPostResponse', stars?: number | null | undefined, error?: { __typename?: 'OperationError', type: string, details: string } | null | undefined } };

export type AuthQueryVariables = Exact<{ [key: string]: never; }>;


export type AuthQuery = { __typename?: 'Query', me: { __typename?: 'AuthUserResponse', success: boolean, error?: { __typename?: 'OperationError', type: string, details: string } | null | undefined } };

export type CutedevQueryVariables = Exact<{
  cuteDevId: Scalars['String'];
}>;


export type CutedevQuery = { __typename?: 'Query', cuteDev?: { __typename?: 'CuteDev', id: string, username: string, bio: string, imageUrl: string, languages: Array<string>, projects: Array<string> } | null | undefined };

export type CutedevPostsQueryVariables = Exact<{
  input: PostsInput;
}>;


export type CutedevPostsQuery = { __typename?: 'Query', posts: Array<{ __typename?: 'Post', id: string, stars: number, text: string, date: string }> };

export type CutedevProfileQueryVariables = Exact<{
  cutedevId: Scalars['String'];
}>;


export type CutedevProfileQuery = { __typename?: 'Query', cuteDev?: { __typename?: 'CuteDev', username: string, imageUrl: string } | null | undefined };

export type PostsQueryVariables = Exact<{
  input: PostsInput;
}>;


export type PostsQuery = { __typename?: 'Query', posts: Array<{ __typename?: 'Post', id: string, text: string, stars: number, date: string, creator: { __typename?: 'CuteDev', id: string, username: string, imageUrl: string } }> };


export const CreatePostDocument = gql`
    mutation CreatePost($text: String!) {
  createPost(text: $text) {
    post {
      id
      text
      stars
      date
      creator {
        username
        imageUrl
      }
    }
    error {
      type
      details
    }
  }
}
    `;

export function useCreatePostMutation() {
  return Urql.useMutation<CreatePostMutation, CreatePostMutationVariables>(CreatePostDocument);
};
export const DeletePostDocument = gql`
    mutation DeletePost($postId: String!) {
  deletePost(postId: $postId) {
    deleted
    error {
      type
      details
    }
  }
}
    `;

export function useDeletePostMutation() {
  return Urql.useMutation<DeletePostMutation, DeletePostMutationVariables>(DeletePostDocument);
};
export const EditCutedevDocument = gql`
    mutation EditCutedev($input: EditCuteDevInput!) {
  editCutedevProfile(input: $input) {
    edited {
      username
      bio
      imageUrl
      imageUrl
      languages
      projects
    }
    error {
      type
      details
    }
  }
}
    `;

export function useEditCutedevMutation() {
  return Urql.useMutation<EditCutedevMutation, EditCutedevMutationVariables>(EditCutedevDocument);
};
export const LoginDocument = gql`
    mutation Login($username: String!, $password: String!) {
  login(username: $username, password: $password) {
    accessToken
    error {
      type
      details
    }
  }
}
    `;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const LogoutDocument = gql`
    mutation Logout {
  logout {
    success
    error {
      type
      details
    }
  }
}
    `;

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument);
};
export const RegisterDocument = gql`
    mutation Register($username: String!, $password: String!) {
  registerCuteDev(username: $username, password: $password) {
    accessToken
    error {
      type
      details
    }
  }
}
    `;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
};
export const StarPostDocument = gql`
    mutation StarPost($postId: String!) {
  starPost(postId: $postId) {
    stars
    error {
      type
      details
    }
  }
}
    `;

export function useStarPostMutation() {
  return Urql.useMutation<StarPostMutation, StarPostMutationVariables>(StarPostDocument);
};
export const AuthDocument = gql`
    query Auth {
  me {
    success
    error {
      type
      details
    }
  }
}
    `;

export function useAuthQuery(options: Omit<Urql.UseQueryArgs<AuthQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<AuthQuery>({ query: AuthDocument, ...options });
};
export const CutedevDocument = gql`
    query Cutedev($cuteDevId: String!) {
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

export function useCutedevQuery(options: Omit<Urql.UseQueryArgs<CutedevQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<CutedevQuery>({ query: CutedevDocument, ...options });
};
export const CutedevPostsDocument = gql`
    query CutedevPosts($input: PostsInput!) {
  posts(input: $input) {
    id
    stars
    text
    date
  }
}
    `;

export function useCutedevPostsQuery(options: Omit<Urql.UseQueryArgs<CutedevPostsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<CutedevPostsQuery>({ query: CutedevPostsDocument, ...options });
};
export const CutedevProfileDocument = gql`
    query CutedevProfile($cutedevId: String!) {
  cuteDev(id: $cutedevId) {
    username
    imageUrl
  }
}
    `;

export function useCutedevProfileQuery(options: Omit<Urql.UseQueryArgs<CutedevProfileQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<CutedevProfileQuery>({ query: CutedevProfileDocument, ...options });
};
export const PostsDocument = gql`
    query Posts($input: PostsInput!) {
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

export function usePostsQuery(options: Omit<Urql.UseQueryArgs<PostsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<PostsQuery>({ query: PostsDocument, ...options });
};